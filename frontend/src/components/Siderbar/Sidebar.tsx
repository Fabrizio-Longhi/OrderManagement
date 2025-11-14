import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">OrderManager</h2>

      <nav className="sidebar-menu">
        <a href="/">Dashboard</a>
        <a href="/products">Productos</a>
        <a href="/orders">Órdenes</a>
        <a href="/customers">Clientes</a>
      </nav>

      <button className="logout-btn" onClick={logout}>
        Cerrar sesión
      </button>
    </aside>
  );
}
