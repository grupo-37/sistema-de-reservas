/// <reference types="jest" />

import request from "./supertest";
import mongoose from "mongoose";

beforeEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API Tests", () => {
  test("/register host Registrar nuevo host", async () => {
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
    expect(response.statusCode).toBe(201);
  });

  test("/register host Correo duplicado", async () => {
    // Registrar a un host
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
    // ver que regresa un 201
    expect(response.statusCode).toBe(201);
    // Registrar a otro host con el mismo correo
    const response2 = await request.post("/api/auth/register/host").send({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      birthday: "1990-01-01",
      phone: "1234567890",
      address: "123 Main St",
      rfc: "ABC123456789",
    });
    // ver que regresa un 400
    expect(response2.statusCode).toBe(400);
  });
});
