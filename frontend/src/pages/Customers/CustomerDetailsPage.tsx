import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCustomerById, deleteCustomer } from "../../api/customers";
import "./CustomerDetailsPage.css";

interface Customer {
  id: number;
  name: string;
  email: string;
}

export default function CustomerDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

async function handleDelete() {
  if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;

  try {
    await deleteCustomer(Number(id));

    toast(
      () => (
        <div className="delete-toast-container">
          <div className="delete-toast">
            <span className="delete-toast-title">Cliente eliminado</span>
            <span className="delete-toast-desc">
              El cliente fue eliminado correctamente.
            </span>
          </div>
        </div>
      ),
      {
        duration: 3500,
      }
    );

    navigate("/customers");
  } catch (error: any) {
    toast.error(error.message || "Error eliminando cliente");
  }
}

  useEffect(() => {
    loadCustomer();
  }, []);

  async function loadCustomer() {
    try {
      setLoading(true);
      const data = await getCustomerById(Number(id));
      setCustomer(data);
    } catch (error) {
      console.error(error);
      alert("No se pudo cargar el cliente");
    } finally {
      setLoading(false);
    }
  }

  if (loading || !customer) {
    return <p style={{ padding: 20 }}>Cargando...</p>;
  }

  return (
    <div className="customer-details-container">
      <h1 className="customer-title">Cliente #{customer.id}</h1>

      <div className="customer-card">
        <p><strong>Nombre:</strong> {customer.name}</p>
        <p><strong>Email:</strong> {customer.email}</p>
      </div>

      <div className="customer-actions">
        <button
          className="btn"
          onClick={() => navigate(`/customers/${customer.id}/edit`)}
        >
          ✏ Editar
        </button>

        <button
          className="btn"
          onClick={handleDelete}
        >
          🗑️ Eliminar Cliente
      </button>

        <button
          className="btn"
          onClick={() => navigate("/customers")}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}
