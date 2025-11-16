import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import "./AuthForm.css";
import toast from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();               // Para cambiar de pagina

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await registerUser(email, password);

    toast((t) => (
      <div className="success-toast-container">
        <div className="success-toast">
          <span className="success-toast-title">Cuenta creada</span>
          <span className="success-toast-desc">
            Tu usuario se registró exitosamente.
          </span>
        </div>
      </div>
    ), {
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1200);

  } catch (err: any) {
    toast.error(err.message || "Credenciales incorrectas");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Crear Cuenta</h1>
        <p>Comienza a gestionar tus órdenes hoy</p>

        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-600">{error}</div>}

          <label>Email</label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />

          <button type="submit">Registrarse</button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes cuenta?</p>
          <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
        </div>
      </div>
    </div>
  );
}
