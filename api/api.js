import express from "express";

import profileRouter from "./routes/profile.route.js";
import propertiesRouter from "./routes/properties.route.js";
import authRouter from "./routes/auth.route.js";
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
// Usar rutas de perfil
api.use("/api/profile", profileRouter);
// Usar rutas de propiedades bajo /api/properties
api.use("/api/properties", propertiesRouter);
api.use("/api/auth", authRouter);
export default api;
