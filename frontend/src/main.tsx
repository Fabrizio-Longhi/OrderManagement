import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>      {/*para que toda la app sepa si el usuario está logueado.*/}
      <BrowserRouter>   {/*para poder usar rutas*/}
      <Toaster position="top-center" />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
