import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../api/customers";
import "./CustomerEditForm.css";

export default function CustomerEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, []);

  async function loadCustomer() {
    try {
      setLoading(true);
      const data = await getCustomerById(Number(id));
      setName(data.name);
      setEmail(data.email);
    } catch (error) {
      alert("No se pudo cargar el cliente");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      await updateCustomer(Number(id), { name, email });

      alert("Cliente actualizado correctamente");
      navigate(`/customers/${id}`);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p style={{ padding: 20 }}>Cargando...</p>;

  return (
    <div className="form-container">
      <h1>Editar Cliente</h1>

      <form onSubmit={handleSubmit} className="form">
        <label>Nombre</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />

        <label>Email</label>
        <input 
          value={email} 
          type="email"
          onChange={(e) => setEmail(e.target.value)} 
          required
        />

        <button type="submit" className="btn-save">
          Guardar Cambios
        </button>

        <button 
          type="button" 
          className="btn-cancel"
          onClick={() => navigate(`/customers/${id}`)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
