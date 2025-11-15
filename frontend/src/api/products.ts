import { API_URL } from "../utils/config";
import { getAuthHeader } from "./utils";

export async function getProducts() {
    const res = await fetch(`${API_URL}/products`,{
        headers: getAuthHeader(),
    })
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const errorMessage = data?.message || "Error al obtener productos";
    throw new Error(errorMessage);
  }

  return data;
}

export async function getProductById(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}

export async function createProduct(data: any) {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const errorMessage = body?.message || "Error al crear producto";
    throw new Error(errorMessage);
  }

  return body;
}

export async function updateProduct(id: number, data: any) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const errorMessage = body?.message || "Error al actualizar producto";
    throw new Error(errorMessage);
  }

  return body;
}
export async function deleteProduct(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const errorMessage = body?.message || "Error al eliminar producto";
    throw new Error(errorMessage);
  }

  return true;
}

