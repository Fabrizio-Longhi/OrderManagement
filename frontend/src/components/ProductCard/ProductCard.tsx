import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

// Define la estructura de datos que esperamos recibir.
interface ProductProps {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  description: string;
  onDelete?: (id: number) => void; // Callback para eliminar
}

export default function ProductCard({
  id,
  name,
  sku,
  price,
  stock,
  description,
  onDelete,
}: ProductProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleDeleteToast = () => {
    setMenuOpen(false);

    toast((t) => (
      <div className="delete-toast">
        <h4 className="delete-toast-title">Eliminar producto</h4>
        <p className="delete-toast-desc">
          ¿Seguro que deseas eliminar "<strong>{name}</strong>"?
        </p>

        <div className="delete-toast-buttons">
          <button
            className="toast-cancel"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>

          <button
            className="toast-delete"
            onClick={() => {
              onDelete?.(id);
              toast.dismiss(t.id);
              toast.success("Producto eliminado");
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    ));
  };


  return (
    <div className="product-card">
      {/* Botón de tres puntos */}
      <div className="product-menu" ref={menuRef}>
        <button 
          className="menu-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Opciones"
        >
          ⋮
        </button>
        
        {menuOpen && (
          <div className="menu-dropdown">
            <button className="menu-item delete" onClick={handleDeleteToast}>
              🗑️ Eliminar
            </button>
          </div>
        )}
      </div>

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