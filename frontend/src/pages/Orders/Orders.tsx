import { useEffect, useState } from "react";
import { getOrders } from "../../api/orders";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div>
          <h1 className="orders-title">Órdenes</h1>
          <p className="orders-subtitle">Gestiona las órdenes de tus clientes</p>
        </div>
        <button 
          className="btn-new-order"
          onClick={() => window.location.href = "/orders/new"}
        >
          + Nueva Orden
        </button>
      </div>


      <div className="orders-table-container">
        <h2 className="table-title">Todas las Órdenes</h2>
        
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Items</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="order-id">#{order.id}</td>
                <td>{order.customer?.name || "Sin cliente"}</td>
                <td>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status === "PENDING" ? "Pendiente" : 
                     order.status === "CONFIRMED" ? "Confirmada" :  order.status}
                  </span>
                </td>
                <td>{order.items?.length || 0} items</td>
                <td className="order-total">${Number(order.total).toFixed(2)}</td>
                <td>{new Date(order.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td>
                  <button className="btn-view" onClick={() => window.location.href = `/orders/${order.id}`}>
                    👁 Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}