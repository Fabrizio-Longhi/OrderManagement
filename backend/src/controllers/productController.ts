import { Request, Response} from "express";
import { prisma } from "../db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (price === undefined || isNaN(Number(price))) {
      return res.status(400).json({ message: "Price is required and must be a number" });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    if (price < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    // Generar SKU automático
    const lastProduct = await prisma.product.findFirst({
      orderBy: { id: "desc" },
    });

    const currentYear = new Date().getFullYear();
    let nextNumber = 1;

    if (lastProduct?.sku) {
      const match = lastProduct.sku.match(/-(\d{4})$/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    const formattedNumber = nextNumber.toString().padStart(4, "0");
    const newSku = `PROD-${currentYear}-${formattedNumber}`;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        sku: newSku,
        price: Number(price),
        stock: Number(stock) || 0,
      },
    });

    res.status(201).json({
      ...product,
      price: parseFloat(product.price.toString()),
    });
  } catch (error) {
    console.error("Error creating product:", error);

    if (typeof error === "object" && error !== null && "name" in error && (error as { name?: string }).name === "PrismaClientValidationError") {
      return res.status(400).json({ message: "Invalid product data" });
    }

    res.status(500).json({ message: "Error creating product" });
  }
};

export const getProducts = async(req: Request, res: Response) => {
    try{
        const products = await prisma.product.findMany();
        res.json(products);
    }catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

export const updateProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    if (price !== undefined && price < 0) {
      return res.status(400).json({ message: "The price cannot be negative" });
    }
    
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ message: "The stock cannot be negative" });
    }

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: price !== undefined ? Number(price) : undefined,
        stock: stock !== undefined ? Number(stock) : undefined,
      },
    });

    res.json({
      ...product,
      price: parseFloat(product.price.toString()),
    });
  } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
            return res.status(404).json({ message: "Product not found" });
            }
    }
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Product not found" });
      }
    }

    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Error deleting product" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Error getting product" });
  }
};