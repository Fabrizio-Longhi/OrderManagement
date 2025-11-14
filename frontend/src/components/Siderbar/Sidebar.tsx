import { useState } from "react";
import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* Botón hamburguesa */}
      <button className="hamburger-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Overlay oscuro (solo mobile) */}
      {open && <div className="sidebar-overlay" onClick={closeSidebar} />}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* Botón X para cerrar (solo mobile) */}
        <button className="close-btn" onClick={closeSidebar}>
          ✕
        </button>

        <h2 className="sidebar-title">OrderManager</h2>

        <nav className="sidebar-menu">
          <a href="/" onClick={closeSidebar}>Dashboard</a>
          <a href="/products" onClick={closeSidebar}>Productos</a>
          <a href="/orders" onClick={closeSidebar}>Órdenes</a>
          <a href="/customers" onClick={closeSidebar}>Clientes</a>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </aside>
    </>
  );
}