import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";
import toast from "react-hot-toast";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password); // llama al backend
      login(res.token); // guarda token en contexto + localStorage
      navigate("/"); // ir a dashboard
    } catch (err: any) {
      toast.error(err.message || "Credenciales incorrectas");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>
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

          <button type="submit">Iniciar sesión</button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes cuenta?</p>
          <button onClick={() => navigate("/register")}>Registrarse</button>
        </div>
      </div>
    </div>
  );
}