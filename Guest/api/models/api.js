import express from "express";
import Guest from "./models/Guest.js";

const api = express();

api.get("/", (req, res) => {
  res.json({
    message: "API funcionando",
  });
});

api.get("/test", async (req, res) => {
  const host = await Host.create({
    firstName: "nombre",
    lastName: "apellido",
    email: "test@test.com",
    password: "123456",
    birthday: new Date(),
    phone: "1234567890",
    rfc: "RFC123456",
    address: "Calle Falsa 123",
  });

  res.json({
    message: "Test endpoint funcionando",
    host,
  });
});

export default api;
