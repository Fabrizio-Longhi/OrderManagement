import { Request, Response} from "express";
import { prisma } from "../db";

export const createOrder = async (req: Request, res: Response) => {
    try{
        const { customerId, items } = req.body

        if (!customerId || !Array.isArray(items) || items.length == 0){
            return res.status(400).json({message: "Customer and items are required"});
        }

        const customer = await prisma.customer.findUnique({
            where : {id : customerId},
        });

        if(!customer){
            return res.status(404).json({message: "Customer not found"});
        }

        const products = await prisma.product.findMany({
            where: {id: {in : items.map((i) => i.productId)}},
        });

        if(products.length !== items.length) {
            return res.status(400).json({ message: "Some products not found" });
        };

        const orderItemsData= items.map((i) => {
            const product = products.find((p) => p.id ===i.productId)!;
            if (!Number.isInteger(i.quantity) || i.quantity <= 0) {
                throw new Error(`Invalid quantity for product ${i.productId}`);
            }
            return{
                productId: i.productId,
                quantity: i.quantity,
                price: product.price,
            };
        });

        const total = orderItemsData.reduce(
            (acc,item) => acc + Number(item.price) * item.quantity,
            0
        );

        const order = await prisma.order.create({
            data: {
                customerId,
                total,
                items:{
                    create: orderItemsData,
                },
            },
            include:{
                items:true,
            },
        });

        res.status(201).json(order)
    }catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
}

export const confirmOrder = async (req: Request, res: Response) =>{
    try{
        const { id } = req.params;

        const order = await prisma.order.findUnique({
            where : { id: Number(id)},
            include: {
                items: { include : {product: true }},
            },
        });

        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        if(order.status == "CONFIRMED"){
            return res.status(400).json({message: "Order already confirmed"});
        }

        // Verificar stock antes de iniciar la transacción
        for( const item of order.items){
            if (item.quantity > item.product.stock){
                return res.status(400).json({message:`Insufficient stock for product ${item.product.name}`,})
            };
        }
        
        //Ejecutar transacción atómica
        const confirmedOrder = await prisma.$transaction(async (tx) =>{
            // Descontar stock de cada producto
            for (const item of order.items){
                await tx.product.update({
                    where: {id : item.productId},
                    data: {stock: item.product.stock - item.quantity},
                });
            }

        // Cambiar estado a CONFIRMED
        return tx.order.update({
            where: {id: Number(id)},
            data: {status : "CONFIRMED"},
            include: {items: true},
            });
        });

        return res.status(200).json(confirmedOrder);
    }catch (error) {
        console.error("Error confirming order:", error);
        res.status(500).json({ message: "Error confirming order" });
    }
}

export const getOrders = async (req: Request, res: Response) => {
    try{
        const orders = await prisma.order.findMany({
            include: {
                customer: true,
                items: { include: { product: true } },
            },
            orderBy: { createdAt: "desc" },
        });
        return res.status(200).json(orders);
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders" });
    }   
}

export const getOrderById = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        const order = await prisma.order.findUnique({ 
            where : { id: Number(id)},
            include : {
                customer : true,
                items : {
                    include : {
                        product :true,
                    },
                },
            },
        });

        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Error fetching order" });
    }
}