import request from "./supertest";

describe("Auth API Tests", () => {
  test("/register host", async () => {
    const response = await request.post("/api/auth/register/host").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      birthday: "1990-01-01",
      phone: "1234567890",
      address: "123 Main St",
      rfc: "ABC123456789",
    });
    console.log(response.body);
    expect(response.statusCode).toBe(201);
  });
});
