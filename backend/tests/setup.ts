import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

import { prisma } from "../src/db";
import app from "../src/app";
import request from "supertest";

console.log("⚙️ NODE_ENV:", process.env.NODE_ENV);
console.log("⚙️ DATABASE_URL:", process.env.DATABASE_URL);

// Exportamos la app y Supertest ya preparado
export const api = request(app);

// Limpiar la base de datos antes de cada test

beforeEach(async () => {
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customers.deleteMany();
});

// Cerrar Prisma al final (buena práctica)
afterAll(async () => {
  await prisma.$disconnect();
});
