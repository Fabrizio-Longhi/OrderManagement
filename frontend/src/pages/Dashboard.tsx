import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { getOrders } from "../api/orders";
import { getCustomers } from "../api/customers";
import "./Dashboard.css";

interface DashboardStats {
  totalProducts: number;
  activeOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  totalCustomers: number;
  newCustomers: number;
  totalRevenue: number;
  revenueGrowth: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    totalCustomers: 0,
    newCustomers: 0,
    totalRevenue: 0,
    revenueGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);

      const [products, orders, customers] = await Promise.all([
        getProducts(),
        getOrders(),
        getCustomers(),
      ]);

      // Calcular estadísticas
      const pendingOrders = orders.filter((o: any) => o.status === "PENDING").length;
      const confirmedOrders = orders.filter((o: any) => o.status === "CONFIRMED").length;
      const totalRevenue = orders.reduce((sum: number, order: any) => sum + Number(order.total), 0);

      setStats({
        totalProducts: products.length,
        activeOrders: orders.length,
        pendingOrders,
        confirmedOrders,
        totalCustomers: customers.length,
        newCustomers: 1, // Hardcodeado por ahora
        totalRevenue,
        revenueGrowth: 18, // Hardcodeado por ahora
      });
    } catch (error) {
      console.error("Error al cargar el dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="dashboard-loading">Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Resumen general de tu sistema de gestión de órdenes</p>
      </div>

      <div className="dashboard-stats">
        {/* Total Productos */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Total Productos</span>
            <span className="stat-icon">📦</span>
          </div>
          <h2 className="stat-value">{stats.totalProducts}</h2>
        </div>

        {/* Órdenes Activas */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Órdenes Activas</span>
            <span className="stat-icon">🛒</span>
          </div>
          <h2 className="stat-value">{stats.activeOrders}</h2>
        </div>

        {/* Clientes */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Clientes</span>
            <span className="stat-icon">👥</span>
          </div>
          <h2 className="stat-value">{stats.totalCustomers}</h2>
        </div>

        {/* Ingresos */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Ingresos</span>
            <span className="stat-icon">💲</span>
          </div>
          <h2 className="stat-value">${stats.totalRevenue.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );
}