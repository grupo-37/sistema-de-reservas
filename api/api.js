import express from "express";
import Host from "./models/Host.js";
import auth  from "./middleware/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import profileRoutes  from "./routes/Profile.js";



dotenv.config();

const api = express();


// Middleware
api.use(express.json());
api.use(auth);
api.use("/api", profileRoutes);

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

// ruta protegida para actualizacion de perfiles
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


api.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const host = await Host.findOne({ email });

    if (!host || host.password !== password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const payload = {
      id: host._id,
      email: host.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ mensaje: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: "Error en el login" });
  }
});


export default api;
