import { Request, Response } from "express";
import { prisma } from "../db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createCustomer = async (req: Request, res: Response) => {
    try{
        const { name, email} = req.body;

        if(!name || !email){
            return res.status(400).json({ message: "Name and email are required"})
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(422).json({ error: "Email invalid" });
        }

        const existing = await prisma.customer.findUnique({where: { email }})
        if(existing){
            return res.status(409).json({message: "Email already exists"});
        }

        const newCustomer = await prisma.customer.create({
            data: { name , email },
        });

        return res.status(201).json(newCustomer);
    }catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ message: "Error creating customer" });
    }
}

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        _count: { select: { orders: true } },
        orders: { select: { total: true } },
      },
    });

    // Calculamos el total gastado por cada cliente
    const customersWithTotals = customers.map((customer) => {
      const totalSpent = customer.orders.reduce((sum, o) => {
        return sum + parseFloat(o.total.toString());
      }, 0);

      return {
        ...customer,
        totalSpent,
      };
    });

    res.json(customersWithTotals);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Error fetching customers" });
  }
};


export const getCustomerById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        const customer = await prisma.customer.findUnique({
            where: {id: Number(id)},
        });

        if(!customer){
            return res.status(404).json({message: "Customer not found"});
        }

        res.json(customer);
    }catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ message: "Error fetching customer" });
    }
}

export const updateCustomer = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        const { name, email} = req.body

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(422).json({ error: "Email invalid" });
        }

        const existing = await prisma.customer.findUnique({
            where : {id: Number(id)},
        });

        if(!existing){
            return res.status(404).json({message: "Customer not found"});
        }

        const updated = await prisma.customer.update({
            where: {id: Number(id)},
            data: { name, email},
        });

        res.json(updated);
    }catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res.status(409).json({ message: "Email already exists" });
            }
            }
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Error updating customer" });
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customerId = Number(id);

    // 1. Obtener las órdenes del cliente
    const orders = await prisma.order.findMany({
      where: { customerId },
      select: { id: true },
    });

    const orderIds = orders.map(o => o.id);

    // 2. Borrar todos los OrderItems de esas órdenes
    await prisma.orderItem.deleteMany({
      where: { orderId: { in: orderIds } }
    });

    // 3. Borrar las órdenes
    await prisma.order.deleteMany({
      where: { customerId }
    });

    // 4. Finalmente borrar el cliente
    await prisma.customer.delete({
      where: { id: customerId }
    });

    res.json({ message: "Customer and related orders deleted successfully" });

  } catch (error: any) {

    console.error("Error deleting customer:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(500).json({ message: "Error deleting customer" });
  }
};
