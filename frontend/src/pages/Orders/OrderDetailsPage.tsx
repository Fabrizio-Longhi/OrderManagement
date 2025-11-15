import { useEffect, useState } from "react";
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
  if (!window.confirm("¿Confirmar esta orden?")) return;

  try {
    await confirmOrder(order.id);
    alert("Orden confirmada correctamente");
    loadOrder(); // Recarga los datos para reflejar los cambios
  } catch (error: any) {
    alert(error.message);
  }
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
                <button className="btn-confirm" onClick={handleConfirm}>
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
