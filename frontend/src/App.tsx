import { ProtectedRoute } from "./components/ProtectedRoute";

function Dashboard() {
  return <h1>Bienvenido al Dashboard</h1>;
}

export default function App() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}