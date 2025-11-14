import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import Products from "./pages/Products/Products";
import ProductFormPage from "./pages/Products/ProductFormPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Products />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/new"
        element={
          <ProtectedRoute>
            <ProductFormPage mode="create" />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/:id/edit"
        element={
          <ProtectedRoute>
            <ProductFormPage mode="edit" />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
