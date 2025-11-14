import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createProduct, getProductById, updateProduct } from "../../api/products";
import "./ProductForm.css";
import { toast } from "react-hot-toast";


export default function ProductFormPage({ mode }: { mode: "create" | "edit" }) {    //Reibe prop
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (mode === "edit" && id) {
      loadProduct();
    }
  }, [mode, id]);

  async function loadProduct() {
    try {
      const product = await getProductById(Number(id));
      setName(product.name);
      setDescription(product.description || "");
      setPrice(String(product.price));
      setStock(String(product.stock));
    } catch (err: any) {
      toast.error("No se pudo cargar el producto");
      navigate("/products");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
    };

    try {
      if (mode === "create") {
        await createProduct(data);
        toast.success("Producto creado");
      } else {
        await updateProduct(Number(id), data);
        toast.success("Producto actualizado");
      }

      navigate("/products");
    } catch (err: any) {
      toast.error(err.message || "Error");
    }
  }

  return (
    <div className="product-form-container">
      <h1>{mode === "create" ? "Crear Producto" : "Editar Producto"}</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Precio</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">
          {mode === "create" ? "Crear" : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
