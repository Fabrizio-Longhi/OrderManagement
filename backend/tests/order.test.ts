import { api } from "./setup";

describe("Orders endpoints", () => {
  test("POST /api/orders should create a new order", async () => {

    const customer = await api.post("/api/customers").send({
      name: "Juan Pérez",
      email: "juan@example.com",
    });

    const product1 = await api.post("/api/products").send({
      name: "Zapatillas",
      description: "Zapatillas deportivas",
      price: 50,
      stock: 10,
    });

    const product2 = await api.post("/api/products").send({
      name: "Remera",
      description: "Remera de algodón",
      price: 25,
      stock: 20,
    });

    const order = await api
      .post("/api/orders")
      .send({
        customerId: customer.body.id,
        items: [
          { productId: product1.body.id, quantity: 2 },
          { productId: product2.body.id, quantity: 1 },
        ],
      })
      .expect(201);

    expect(order.body).toHaveProperty("id");
    expect(order.body.status).toBe("PENDING");
    expect(order.body.items).toHaveLength(2);
  });

    test("PATCH /api/orders/:id/confirm should confirm an order and update stock", async () => {
    const customer = await api.post("/api/customers").send({
      name: "Laura Gómez",
      email: "laura@example.com",
    });


    const product1 = await api.post("/api/products").send({
      name: "Notebook",
      description: "Laptop 15 pulgadas",
      price: 1000,
      stock: 5,
    });

    const product2 = await api.post("/api/products").send({
      name: "Mouse",
      description: "Mouse inalámbrico",
      price: 50,
      stock: 10,
    });

    const order = await api.post("/api/orders").send({
      customerId: customer.body.id,
      items: [
        { productId: product1.body.id, quantity: 1 },
        { productId: product2.body.id, quantity: 2 },
      ],
    });

    expect(order.status).toBe(201);
    expect(order.body.status).toBe("PENDING");

    const confirm = await api
      .patch(`/api/orders/${order.body.id}/confirm`)
      .expect(200);

    expect(confirm.body.status).toBe("CONFIRMED");

    const updatedProduct1 = await api.get(`/api/products/${product1.body.id}`);
    const updatedProduct2 = await api.get(`/api/products/${product2.body.id}`);

    expect(updatedProduct1.body.stock).toBe(4); // 5 - 1
    expect(updatedProduct2.body.stock).toBe(8); // 10 - 2
  });

  test("GET /api/orders/:id should return the order details with items", async () => {

  const customer = await api.post("/api/customers").send({
    name: "Carlos Ruiz",
    email: "carlos@example.com",
  });

  const product = await api.post("/api/products").send({
    name: "Auriculares",
    description: "Auriculares Bluetooth",
    price: 80,
    stock: 15,
  });

  const order = await api.post("/api/orders").send({
    customerId: customer.body.id,
    items: [{ productId: product.body.id, quantity: 2 }],
  });

  const response = await api.get(`/api/orders/${order.body.id}`).expect(200);

  expect(response.body).toHaveProperty("id", order.body.id);
  expect(response.body.customer.name).toBe("Carlos Ruiz");
  expect(response.body.items).toHaveLength(1);
  expect(response.body.items[0].quantity).toBe(2);
});

test("GET /api/orders should return a list of orders", async () => {

  const customer = await api.post("/api/customers").send({
    name: "María López",
    email: "maria@example.com",
  });

  const product = await api.post("/api/products").send({
    name: "Camiseta Blanca",
    description: "Camiseta básica de algodón",
    price: 20,
    stock: 50,
  });

  await api.post("/api/orders").send({
    customerId: customer.body.id,
    items: [{ productId: product.body.id, quantity: 2 }],
  });

  const response = await api.get("/api/orders").expect(200);

  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBeGreaterThanOrEqual(1);
  expect(response.body[0]).toHaveProperty("status");
    });

test("POST /api/orders should return 400 if required fields are missing", async () => {
    const response = await api.post("/api/orders").send({}).expect(400);
    expect(response.body).toHaveProperty("message");
    });

test("GET /api/orders/:id should return 404 if order does not exist", async () => {
  const response = await api.get("/api/orders/9999").expect(404);
  expect(response.body).toHaveProperty("message");
});

test("PATCH /api/orders/:id/confirm should return 404 if order does not exist", async () => {
  const response = await api.patch("/api/orders/9999/confirm").expect(404);
  expect(response.body).toHaveProperty("message");
});

test("PATCH /api/orders/:id/confirm should return 400 if order is already confirmed", async () => {
  const customer = await api.post("/api/customers").send({
    name: "Pedro Gómez",
    email: "pedro@example.com",
  });

  const product = await api.post("/api/products").send({
    name: "Teclado",
    description: "Teclado mecánico",
    price: 100,
    stock: 10,
  });

  const order = await api.post("/api/orders").send({
    customerId: customer.body.id,
    items: [{ productId: product.body.id, quantity: 2 }],
  });

  await api.patch(`/api/orders/${order.body.id}/confirm`).expect(200);

  const response = await api.patch(`/api/orders/${order.body.id}/confirm`).expect(400);
  expect(response.body.message).toMatch(/Order already confirmed/i);
});

test("POST /api/orders should fail if customerId is missing", async () => {
  const response = await api.post("/api/orders").send({
    items: [{ productId: 1, quantity: 2 }],
  });
  expect(response.status).toBe(400);
  expect(response.body.message).toMatch(/Customer and items are required/i);
});

test("POST /api/orders should fail if items array is empty", async () => {
  const customer = await api.post("/api/customers").send({
    name: "Carlos Ruiz",
    email: "carlos@example.com",
  });

  const response = await api.post("/api/orders").send({
    customerId: customer.body.id,
    items: [],
  });

  expect(response.status).toBe(400);
  expect(response.body.message).toMatch(/items/i);
});

test("POST /api/orders should fail if product does not exist", async () => {
  const customer = await api.post("/api/customers").send({
    name: "Lucía Torres",
    email: "lucia@example.com",
  });

  const response = await api.post("/api/orders").send({
    customerId: customer.body.id,
    items: [{ productId: 9999, quantity: 1 }],
  });

  expect(response.status).toBe(400);
  expect(response.body.message).toMatch(/Some products not found/i);
});

test("PUT /api/orders/:id/confirm should fail if stock is insufficient", async () => {
  const customer = await api.post("/api/customers").send({
    name: "Pedro Gómez",
    email: "pedro@example.com",
  });

  const product = await api.post("/api/products").send({
    name: "Monitor",
    description: "Monitor Full HD",
    price: 200,
    stock: 1,
  });

  const order = await api.post("/api/orders").send({
    customerId: customer.body.id,
    items: [{ productId: product.body.id, quantity: 5 }],
  });

  const response = await api.patch(`/api/orders/${order.body.id}/confirm`);
  expect(response.status).toBe(400);
  expect(response.body.message).toMatch(/stock/i);
});
});
