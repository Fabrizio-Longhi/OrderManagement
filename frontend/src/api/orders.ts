import { API_URL } from "../utils/config";

export async function getOrders() {
  const res = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error fetching orders");
  return res.json();
}

export async function getOrderById(id: number) {
  const res = await fetch(`${API_URL}/orders/${id}`);

  let body = null;
  try {
    body = await res.json();
  } catch {}

  if (!res.ok) {
    const msg = body?.message || "Error fetching order";
    throw new Error(msg);
  }

  return body;
}


export async function createOrder(data: any) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json();

  if (!res.ok) throw new Error(body.message || "Error creando orden");

  return body;
}

export async function confirmOrder(id: number) {
  const res = await fetch(`${API_URL}/orders/${id}/confirm`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  let body = null;
  try {
    body = await res.json();
  } catch {}

  if (!res.ok) {
    const msg = body?.message || "Error confirming order";
    throw new Error(msg);
  }

  return body;
}

