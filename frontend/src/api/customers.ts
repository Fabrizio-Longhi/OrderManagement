import { API_URL } from "../utils/config";


export async function createCustomer(data: any) {
  const res = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let msg = "Error creando cliente";

    try {
      const body = await res.json();
      msg = body.error || body.message || msg;
    } catch (_) {}

    throw new Error(msg);
  }

  return res.json();
}


export async function getCustomerById(id: number) {
  const res = await fetch(`${API_URL}/customers/${id}`);

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.message || "Error obteniendo cliente");
  }

  return body;
}

export async function getCustomers() {
  const res = await fetch(`${API_URL}/customers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error fetching customers");
  return res.json();
}


export async function updateCustomer(id: number, data: any) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let msg = "Error actualizando cliente";

    try {
      const body = await res.json();
      msg = body.error || body.message || msg;
    } catch (_) {}

    throw new Error(msg);
  }

  return res.json();
}


export async function deleteCustomer(id: number) {
  const res = await fetch(`${API_URL}/customers/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const errorMessage = body?.message || "Error eliminando cliente";
    throw new Error(errorMessage);
  }

  return true;
}
