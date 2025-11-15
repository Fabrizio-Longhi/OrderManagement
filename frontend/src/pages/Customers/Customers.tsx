import { useEffect, useState } from "react";
import { getCustomers } from "../../api/customers";
import "./Customers.css";

interface Customer {
  id: number;
  name: string;
  email: string;
  orders: any[];
  _count?: {
    orders: number;
  };
  totalSpent?: number;
}

interface Stats {
  totalCustomers: number;
  avgOrderValue: number;
  totalOrders: number;
}

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalCustomers: 0,
    avgOrderValue: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
      calculateStats(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      alert("No se pudieron cargar los clientes");
    } finally {
      setLoading(false);
    }
  }

  function calculateStats(data: Customer[]) {
    const totalCustomers = data.length;
    const totalOrders = data.reduce((sum, customer) => {
      return sum + (customer._count?.orders || customer.orders?.length || 0);
    }, 0);
    
    const totalSpent = data.reduce((sum, customer) => {
      return sum + (customer.totalSpent || 0);
    }, 0);
    
    const avgOrderValue = totalCustomers > 0 ? totalSpent / totalCustomers : 0;

    setStats({
      totalCustomers,
      avgOrderValue,
      totalOrders,
    });
  }

  const getCustomerOrders = (customer: Customer) => {
    return customer._count?.orders || customer.orders?.length || 0;
  };

  const getCustomerTotal = (customer: Customer) => {
    return customer.totalSpent || 0;
  };

  return (
    <div className="customers-container">
      <div className="customers-header">
        <div>
          <h1 className="customers-title">Clientes</h1>
          <p className="customers-subtitle">Administra tu base de clientes</p>
        </div>
        <button 
          className="btn-new-customer"
          onClick={() => window.location.href = "/customers/new"}
        >
          + Nuevo Cliente
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Total Clientes</p>
          <h2 className="stat-value">{stats.totalCustomers}</h2>
          <p className="stat-note">+2 este mes</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Valor Promedio</p>
          <h2 className="stat-value">${stats.avgOrderValue.toFixed(2)}</h2>
          <p className="stat-note">Por cliente</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Órdenes Totales</p>
          <h2 className="stat-value">{stats.totalOrders}</h2>
          <p className="stat-note">Todas las órdenes</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="customers-table-container">
        <h2 className="table-title">Lista de Clientes</h2>
        
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Órdenes</th>
                <th>Total Gastado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="customer-id">#{customer.id}</td>
                  <td className="customer-name">{customer.name}</td>
                  <td className="customer-email">
                    <span className="email-icon">✉</span> {customer.email}
                  </td>
                  <td>{getCustomerOrders(customer)} órdenes</td>
                  <td className="customer-total">${getCustomerTotal(customer).toFixed(2)}</td>
                  <td>
                    <button 
                      className="btn-view"
                      onClick={() => window.location.href = `/customers/${customer.id}`}
                    >
                      👁 Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && customers.length === 0 && (
          <p className="no-customers">No hay clientes registrados</p>
        )}
      </div>
    </div>
  );
}