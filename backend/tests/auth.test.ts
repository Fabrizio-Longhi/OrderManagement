import { api } from "./setup";


//REGISTER

describe("Auth endpoints", () => {
  test("POST /api/auth/register should create a new user", async () => {
    const response = await api
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "12345678910",
      })
      .expect(201) // esperamos status 201
      .expect("Content-Type", /json/);

    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("test@example.com");
  });
});

test("POST /api/auth/register should fail with short password", async () => {
  const res = await api.post("/api/auth/register").send({
    email: "shortpass@gmail.com",
    password: "short",
  });

  expect(res.status).toBe(422);
  expect(res.body.error).toBe("Password more short");
});

test("POST /api/auth/register email invalid", async () => {
  const res = await api.post("/api/auth/register").send({
    email: "invalidemail",
    password: "validpassword123",
  });

  expect(res.status).toBe(422);
  expect(res.body.error).toBe("Email invalid");
});

test ("POST /api/auth/register should fail when email already exists", async () => {
  await api.post("/api/auth/register").send({
    email: "emailexist@email.com",
    password: "validpassword123",
  });

  const res = await api.post("/api/auth/register").send({
    email: "emailexist@email.com",
    password: "anothervalidpassword",
  });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe("User already exists");
});


//LOGIN


test("POST /api/auth/login should return a valid token", async () => {
  // Primero registramos un usuario
  await api.post("/api/auth/register").send({
    email: "login@example.com",
    password: "12345678910",
  });

  // Luego probamos el login
  const res = await api
    .post("/api/auth/login")
    .send({
      email: "login@example.com",
      password: "12345678910",
    })
    .expect(200);

  expect(res.body).toHaveProperty("token");
  expect(typeof res.body.token).toBe("string");
});

test("POST /api/auth/login should fail with wrong password", async () => {
  await api.post("/api/auth/register").send({
    email: "wrongpass@example.com",
    password: "12345678910",
  });

  const res = await api.post("/api/auth/login").send({
    email: "wrongpass@example.com",
    password: "wrongpassword",
  });

  expect(res.status).toBe(401);
  expect(res.body.error).toBe("Invalid credentials");
});

test("POST /api/auth/login should fail with non-existing email", async () => {
  const res = await api.post("/api/auth/login").send({
    email: "emailnotexists@gmail.com",
    password: "somepassword",
  });

  expect(res.status).toBe(401);
  expect(res.body.error).toBe("Invalid credentials");
});

test("POST /api/auth/login should fail with missing email", async () => {
  const res = await api.post("/api/auth/login").send({
    password: "somepassword",
  });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Email and password required");
});

test("POST /api/auth/login should fail with missing password", async () => {
  const res = await api.post("/api/auth/login").send({
    email: "email@gmail.com",
  });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe("Email and password required");
});

//ME

test("GET /api/auth/me should return user info if token is valid", async () => {
  const registerRes = await api.post("/api/auth/register").send({
    email: "me@example.com",
    password: "12345678910",
  });

  const loginRes = await api.post("/api/auth/login").send({
    email: "me@example.com",
    password: "12345678910",
  });

  const token = loginRes.body.token;

  const meRes = await api
    .get("/api/auth/me")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  expect(meRes.body.user.email).toBe("me@example.com");
});

test("GET /api/auth/me should return 401 if token is missing", async () => {
  const res = await api.get("/api/auth/me");
  expect(res.status).toBe(401);
  expect(res.body.error).toBe("Token not provided");
});


