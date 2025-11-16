import { Routes, Route } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import Products from "./pages/Products/Products";
import ProductFormPage from "./pages/Products/ProductFormPage";
import Orders from "./pages/Orders/Orders";
import OrderCreatePage from "./pages/Orders/OrderCreatePage";
import OrderDetailsPage from "./pages/Orders/OrderDetailsPage";
import Customers from "./pages/Customers/Customers";
import CustomerFormPage from "./pages/Customers/CustomerFormPage";
import CustomerDetailsPage from "./pages/Customers/CustomerDetailsPage";
import CustomerEditForm from "./pages/Customers/CustomerEditForm";

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

      <Route path="/orders" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Orders />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/orders/new" element={
        <ProtectedRoute>
          <DashboardLayout>
            <OrderCreatePage />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <OrderDetailsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/customers" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Customers />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/customers/new" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CustomerFormPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/customers/:id" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CustomerDetailsPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/customers/:id/edit" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CustomerEditForm />
          </DashboardLayout>
        </ProtectedRoute>
      } />
    </Routes>
    
  );
}

export default App;
