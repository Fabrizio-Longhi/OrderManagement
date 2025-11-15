import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../../api/customers";
import "./CustomerFormPage.css";

export default function CustomerFormPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // si existe → estamos editando

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  // Si estamos editando, cargar datos del cliente
  useEffect(() => {
    if (!isEditing) return;
    loadCustomer();
  }, []);

  async function loadCustomer() {
    try {
      setLoading(true);
      const data = await getCustomerById(Number(id));
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      console.error(error);
      alert("Error cargando datos del cliente");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      return alert("Nombre y email son obligatorios");
    }

    try {
      setLoading(true);

      if (isEditing) {
        await updateCustomer(Number(id), { name, email });
      } else {
        await createCustomer({ name, email });
      }

      navigate("/customers");
    } catch (error: any) {
      alert(error.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="customer-form-container">
      <h1 className="form-title">
        {isEditing ? "Editar Cliente" : "Nuevo Cliente"}
      </h1>

      <form className="customer-form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input
            type="text"
            value={name}
            placeholder="Juan Pérez"
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            placeholder="correo@ejemplo.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <button className="btn-save" type="submit" disabled={loading}>
          {loading
            ? "Guardando..."
            : isEditing
            ? "Guardar Cambios"
            : "Crear Cliente"}
        </button>
      </form>
    </div>
  );
}
