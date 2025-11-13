import { Request, Response } from "express";
import { prisma } from "../db";

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
    try{
        const customer = await prisma.customer.findMany();
        res.json(customer);
    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ message: "Error fetching customer" });
    }
}

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
        console.error("Error updating customer:", error);
        res.status(500).json({ message: "Error updating customer" });
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    try{
        const { id }= req.params

    const existing = await prisma.customer.findUnique({
            where : {id: Number(id)},
        });

    if(!existing){
        return res.status(404).json({message: "Customer not found"});
    }

    await prisma.customer.delete({ where: { id: Number(id)}});
    res.status(200).json({ message: "Customer deleted successfully"});
    }catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ message: "Error deleting customer" });
  }
}