import express from "express";
import Host from "./models/Host.js";
import propertiesRouter from "./routes/properties.route.js";

const api = express();

// Middleware para parsear JSON
api.use(express.json());

// Middleware temporal para simular usuario autenticado (solo para pruebas locales)
// eliminar en producción
api.use((req, res, next) => {
  // Simula un usuario host autenticado
  req.user = { id: "123", role: "host" };
  next();
});

// Ruta principal
api.get("/", (req, res) => {
  res.json({
    message: "API funcionando",
  });
});

// Ruta de test
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

// Usar rutas de propiedades bajo /api/properties
api.use("/api/properties", propertiesRouter);

export default api;
