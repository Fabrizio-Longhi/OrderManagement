import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

// Define la estructura de datos que esperamos recibir.
interface ProductProps {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  description: string;
}

export default function ProductCard({
  id,
  name,
  sku,
  price,
  stock,
  description,
}: ProductProps) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="product-body">
        <h3 className="product-name">{name}</h3>
        <p className="product-sku">SKU: {sku}</p>
        <p className="product-description">{description}</p>

        <p className="product-price">${Number(price).toFixed(2)}</p>
        <p className="product-stock">Stock: {stock} unidades</p>
      </div>

      <div className="product-footer">
        <button
          className="btn-edit"
          onClick={() => navigate(`/products/${id}/edit`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}
