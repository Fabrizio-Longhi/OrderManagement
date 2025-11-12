import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/productRoutes";
import customerRoutes from "./routes/customerRouter"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/customers",customerRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;