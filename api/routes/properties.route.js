// Rutas para operaciones sobre propiedades (Property)
import { Router } from "express";
import { createProperty } from "../controllers/properties.controller.js";
import { body, validationResult } from "express-validator";
import onlyHost from "../middlewares/onlyHost.js";

const router = Router();

// Middleware para manejar errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Ruta POST para registrar una nueva propiedad con validación y solo para hosts
router.post(
  "/",
  onlyHost,
  [
    body("propertyType")
      .isIn(["loft", "penthouse", "room", "house", "apartment"])
      .withMessage("Tipo de propiedad inválido"),
    body("address.street").notEmpty().withMessage("La calle es obligatoria"),
    body("address.streetNumber")
      .isNumeric()
      .withMessage("Número de calle inválido"),
    body("address.neighborhood")
      .notEmpty()
      .withMessage("El barrio es obligatorio"),
    body("address.zipCode").isNumeric().withMessage("Código postal inválido"),
    body("address.state").notEmpty().withMessage("El estado es obligatorio"),
    body("address.city").notEmpty().withMessage("La ciudad es obligatoria"),
    body("address.country").notEmpty().withMessage("El país es obligatorio"),
    body("rooms").isNumeric().withMessage("Número de habitaciones inválido"),
    body("baths").isNumeric().withMessage("Número de baños inválido"),
    body("parkingSpots")
      .isNumeric()
      .withMessage("Número de estacionamientos inválido"),
    body("rate").isNumeric().withMessage("Tarifa inválida"),
    body("photos").isArray().withMessage("Las fotos deben ser un arreglo"),
    body("maxGuest").isNumeric().withMessage("Máximo de huéspedes inválido"),
    body("coords.type")
      .equals("Point")
      .withMessage("El tipo de coordenada debe ser 'Point'"),
    body("coords.coordinates")
      .isArray({ min: 2, max: 2 })
      .withMessage("Las coordenadas deben ser un arreglo de longitud 2"),
    // Amenidades: opcionales, pero si llegan deben ser booleanos
    body("amenities.internet").optional().isBoolean(),
    body("amenities.pool").optional().isBoolean(),
    body("amenities.jacuzzi").optional().isBoolean(),
    body("amenities.grill").optional().isBoolean(),
    body("amenities.kitchen").optional().isBoolean(),
    body("amenities.fridge").optional().isBoolean(),
    body("amenities.gym").optional().isBoolean(),
    body("amenities.washer").optional().isBoolean(),
    body("amenities.dryer").optional().isBoolean(),
    body("amenities.petFriendly").optional().isBoolean(),
    validate
  ],
  createProperty
);

export default router;
