import express from "express";

import propertiesRouter from "./routes/properties.route.js";
<<<<<<< HEAD
import authRoutes from "./routes/authRoutes.js";
=======
import authRouter from "./routes/auth.route.js";
>>>>>>> c638cde2497b3c2bfd01c3b65759bfe591ba4fa7
import cors from "cors";

const api = express();

// Middleware para parsear JSON
api.use(express.json());
api.use(cors());

// Ruta principal
api.get("/", (req, res) => {
  res.json({
    message: "API funcionando",
  });
});

// Usar rutas de autenticación bajo /api/auth
api.use("/api/auth", authRouter);
// Usar rutas de propiedades bajo /api/properties
api.use("/api/properties", propertiesRouter);

<<<<<<< HEAD
api.use("/api/auth", authRoutes);
=======
>>>>>>> c638cde2497b3c2bfd01c3b65759bfe591ba4fa7

export default api;
