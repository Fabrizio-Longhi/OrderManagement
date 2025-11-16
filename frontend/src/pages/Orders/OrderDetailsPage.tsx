import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, confirmOrder } from "../../api/orders";
import "./OrderDetailsPage.css";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {
    try {
      const data = await getOrderById(Number(id));
      setOrder(data);
    } catch (error: any) {
      alert(error.message);
      navigate("/orders");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm() {
  toast(
    (t) => (
      <div className="confirm-toast-container">
        <span className="confirm-toast-text">¿Confirmar esta orden?</span>

        <div className="confirm-toast-actions">
          <button
            className="confirm-btn"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await confirmOrder(order.id);
                toast.success("Orden confirmada correctamente");
                loadOrder();
              } catch (error: any) {
                toast.error(error.message);
              }
            }}
          >
            Confirmar
          </button>

          <button
            className="cancel-btn"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ),
    {
      duration: 8000,
      style: {
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "16px 20px",
      },
    }
  );
}


  if (loading) return <p className="loading">Cargando...</p>;
  if (!order) return null;

  return (
    <div className="order-details-container">
      
      {/* Header */}
      <div className="order-header">
        <h1 className="order-title">Orden #{order.id}</h1>
        <div className="order-actions">
            {order.status === "PENDING" && (
                <button className="btn-back" onClick={handleConfirm}>
                ✔ Confirmar Orden
                </button>
            )}

            <button className="btn-back" onClick={() => navigate("/orders")}>
                ← Volver
            </button>
            </div>
      </div>

      {/* Información general */}
      <div className="order-info-card">
        <p><strong>Cliente:</strong> {order.customer?.name || "Sin cliente"}</p>
        <p><strong>Email:</strong> {order.customer?.email || "-"}</p>
        <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleString()}</p>

        <p>
          <strong>Estado:</strong>{" "}
          <span className={`status-badge ${order.status.toLowerCase()}`}>
            {order.status === "PENDING"
              ? "Pendiente"
              : order.status === "CONFIRMED"
              ? "Confirmada"
              : order.status}
          </span>
        </p>
      </div>

      {/* Tabla de items */}
      <div className="order-items-card">
        <h2>Productos del pedido</h2>

        <table className="items-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item: any) => (
              <tr key={item.id}>
                <td>{item.product?.name || "(Eliminado)"}</td>
                <td>${Number(item.price).toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(Number(item.price) * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="order-total">
          <strong>Total:</strong> ${Number(order.total).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
