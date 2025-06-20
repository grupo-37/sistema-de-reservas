import express from "express";
import Host from "./models/Host.js";
import auth from "./middleware/auth.js";
import dotenv from "dotenv";
import profileRoutes from "./routes/Profile.js";

dotenv.config();

const api = express();

// Middleware
api.use(express.json());

// Rutas públicas
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

// Rutas protegidas
api.use("/api", auth, profileRoutes);

api.put("/hosts/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    const host = await Host.findByIdAndUpdate(id, datosActualizados, {
      new: true,
    });

    if (!host) {
      return res.status(404).json({ mensaje: "Host no encontrado" });
    }

    res.json({ mensaje: "Perfil actualizado correctamente", host });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar el perfil" });
  }
});

//  Ruta de login removida porque no pertenece a mi  ticket

export default api;
