// Rutas para operaciones sobre propiedades (Property)
import { Router } from "express";
import { createProperty } from "../controllers/properties.controller.js";
import onlyHost from "../middlewares/onlyHost.js";
import validateBody from "../middlewares/validateBody.js";
import validateProperty from "../validators/newProperty.validator.js";

const router = Router();

// Ruta POST para registrar una nueva propiedad con validación y solo para hosts
router.post("/", onlyHost, validateBody(validateProperty), createProperty);

export default router;
