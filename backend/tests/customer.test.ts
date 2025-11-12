import { api } from "./setup";


describe("Customer endpoints", () =>{
    test("POST /api/customers should create a new customer", async () => {
        const response = await api
            .post("/api/customers")
            .send({
                name: "John Doe",
                email: "john.doe@example.com"
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    test("GET /api/customers should return a list of customers", async () => {
        const response = await api.get("/api/customers");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /api/customers/:id should return a single customer", async () => {
        const newCustomer = await api
            .post("/api/customers")
            .send({
                name: "Jane Smith",
                email: "jane.smith@example.com"
            });
            
        const customerId = newCustomer.body.id;
        const response = await api.get(`/api/customers/${customerId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", customerId);
    });

    test("PUT /api/customers/:id should update a customer", async () => {
        const newCustomer = await api
            .post("/api/customers")
            .send({
                name: "Alice Johnson",
                email: "alice.johnson@example.com"
            });

        const customerId = newCustomer.body.id;
        const response = await api.put(`/api/customers/${customerId}`)
            .send({
                name: "Alice Johnson",
                email: "alice.johnson@newdomain.com"
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", customerId);
    });

    test("DELETE /api/customers/:id should delete a customer", async () => {
        const newCustomer = await api
            .post("/api/customers")
            .send({
                name: "Bob Brown",
                email: "bob.brown@example.com"
            });

        const customerId = newCustomer.body.id;
        const response = await api.delete(`/api/customers/${customerId}`);
        expect(response.status).toBe(200);
    });

    test("GET /api/customers/:id for non-existing customer should return 404", async () => {
        const response = await api.get("/api/customers/9999");
        expect(response.status).toBe(404);
    });

    test("PUT /api/customers/:id for non-existing customer should return 404", async () => {
        const response = await api.put("/api/customers/9999")
            .send({
                name: "Non Existing",
                email: "non.existing@example.com"
            });
        expect(response.status).toBe(404);
    });
    test("DELETE /api/customers/:id for non-existing customer should return 404", async () => {
        const response = await api.delete("/api/customers/9999");
        expect(response.status).toBe(404);
    });

    test("POST /api/customers with missing fields should return 400", async () => {
        const response = await api
            .post("/api/customers")
            .send({
                name: "Incomplete Customer"
            });
        expect(response.status).toBe(400);
    });

    test("POST /api/customers email already exists should return 409", async () => {
        await api
            .post("/api/customers")
            .send({
                name: "Existing Customer",
                email: "existing.customer@example.com"
            });
        const response = await api
            .post("/api/customers")
            .send({
                name: "Another Customer",
                email: "existing.customer@example.com"
            });
        expect(response.status).toBe(409);
    });

    test("POST /api/customers with invalid email should return 422", async () => {
        const response = await api
            .post("/api/customers")
            .send({
                name: "Invalid Email Customer",
                email: "invalid-email"
            });
        expect(response.status).toBe(422);
    });

    test("PUT /api/customers/:id with invalid email should return 422", async () => {
        const newCustomer = await api
            .post("/api/customers")
            .send({
                name: "Valid Customer",
                email: "valid.customer@example.com"
            });

        const customerId = newCustomer.body.id;
        const response = await api.put(`/api/customers/${customerId}`)
            .send({
                name: "Valid Customer",
                email: "invalid-email"
            });
        expect(response.status).toBe(422);
    });
});