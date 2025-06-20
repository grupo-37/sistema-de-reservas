import express from "express";
import { registerHost } from "../controllers/auth.controller.js";
import registerHostValidator from "../validators/registerHost.validator.js";
import validateBody from "../middlewares/validateBody.js";

const authRoutes = express.Router();

// Ruta POST para registrar un nuevo host con validación
authRoutes.post(
  "/register/host",
  validateBody(registerHostValidator),
  registerHost
);

export default authRoutes;
