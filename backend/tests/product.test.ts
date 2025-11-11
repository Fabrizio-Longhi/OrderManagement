import { api } from "./setup";

describe("Product endpoints", () => {
  test("POST /api/products should create a new product with auto SKU", async () => {
    const response = await api
      .post("/api/products")
      .send({
        name: "Remera Negra",
        description: "Remera de algodón color negra",
        price: 19.99,
        stock: 10,
      })
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("sku");
    expect(response.body.sku).toMatch(/^PROD-\d{4}-\d{4}$/);
    expect(response.body.name).toBe("Remera Negra");
  });

  test("GET /api/products should return the list of products", async () => {
    const response = await api.get("/api/products").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/products/:id should return a single product", async () => {
    const newProduct = await api.post("/api/products").send({
      name: "Pantalón Azul",
      description: "Pantalón de mezclilla color azul",
      price: 39.99,
      stock: 5,
    });

    const productId = newProduct.body.id;

    const response = await api.get(`/api/products/${productId}`).expect(200);

    expect(response.body).toHaveProperty("id", productId);
    expect(response.body.name).toBe("Pantalón Azul");
  });

  test("PUT /api/products/:id should update a product", async () => {
    const newProduct = await api.post("/api/products").send({
      name: "Gorra Roja",
      description: "Gorra deportiva color roja",
      price: 14.99,
      stock: 20,
    });

    const productId = newProduct.body.id;

    const response = await api
      .put(`/api/products/${productId}`)
      .send({ price: 12.99, stock: 25 })
      .expect(200);

    expect(response.body).toHaveProperty("id", productId);
    expect(response.body.price).toBe(12.99);
    expect(response.body.stock).toBe(25);
  });

  test("DELETE /api/products/:id should delete a product", async () => {
    const newProduct = await api.post("/api/products").send({
      name: "Zapatos Verdes",
      description: "Zapatos deportivos color verde",
      price: 59.99,
      stock: 15,
    });

    const productId = newProduct.body.id;

    await api.delete(`/api/products/${productId}`).expect(200);

    await api.get(`/api/products/${productId}`).expect(404);
  });

  test("GET /api/products/:id should return 404 for non-existent product", async () => {
    await api.get("/api/products/9999").expect(404);
  });

  test("PUT /api/products/:id should return 404 for non-existent product", async () => {
    await api
      .put("/api/products/9999")
      .send({ price: 29.99 })
      .expect(404);
  });

  test("DELETE /api/products/:id should return 404 for non-existent product", async () => {
    await api.delete("/api/products/9999").expect(404);
  });

  test("PUT /api/products/:id should not allow negative price or stock", async () => {
    const newProduct = await api.post("/api/products").send({
      name: "Cinturón Marrón",
      description: "Cinturón de cuero color marrón",
      price: 24.99,
      stock: 8,
    });

    const productId = newProduct.body.id;

    await api
      .put(`/api/products/${productId}`)
      .send({ price: -10.0 })
      .expect(400);

    await api
      .put(`/api/products/${productId}`)
      .send({ stock: -5 })
      .expect(400);
  });

  test("POST /api/products empty body", async () => {
    await api.post("/api/products").send({}).expect(400);
  });

  
});