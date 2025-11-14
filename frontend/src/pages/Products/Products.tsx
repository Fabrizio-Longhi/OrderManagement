import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, []);

  return (
    <div className="products-container">
      <div className="products-header">
        <div>
          <h1>Productos</h1>
          <p className="products-subtitle">
            Gestiona tu catálogo de productos
          </p>
        </div>

        <button
          className="btn-new"
          onClick={() => navigate("/products/new")}
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
