import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔥 FUNCIÓN PARA ELIMINAR PRODUCTO
  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      // refrescar lista
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Error al eliminar el producto");
    }
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1>Productos</h1>
          <p className="products-subtitle">Gestiona tu catálogo de productos</p>
        </div>

        <button className="btn-new" onClick={() => navigate("/products/new")}>
          + Nuevo Producto
        </button>
      </div>

      <div className="products-grid">
        {products.map((p) => (
          <ProductCard 
            key={p.id} 
            {...p} 
            onDelete={handleDelete}   // ← envío del callback
          />
        ))}
      </div>
    </div>
  );
}
