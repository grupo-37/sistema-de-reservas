import express from "express";
import Host from "./models/Host.js";
import  authRoutes  from "./routes/authRoutes.js";

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
    password: "123",
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

api.use(express.json());
api.use("/api/auth", authRoutes);

export default api;
