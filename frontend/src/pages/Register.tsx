import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password); // Llama al backend
      setSuccess("Usuario creado correctamente");
      setTimeout(() => navigate("/login"), 1000); // redirige luego de 1 seg
    } catch (err: any) {
      setError(err.message || "Error al registrar usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Registrar</button>

      <p>
        ¿Ya tenés cuenta?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Iniciá sesión
        </span>
      </p>
    </form>
  );
}
