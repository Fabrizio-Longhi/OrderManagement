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
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Order not found");
  return res.json();
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
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  const body = await res.json();

  if (!res.ok) throw new Error(body.message || "Error confirmando orden");

  return body;
}
