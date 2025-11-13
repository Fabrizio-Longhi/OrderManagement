import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

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
      setError(err.message || "Error en login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-600">{error}</div>}
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
