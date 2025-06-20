import { body } from "express-validator";

const validator = [
  body("firstName").notEmpty().withMessage("El nombre es obligatorio"),
  body("lastName").notEmpty().withMessage("El apellido es obligatorio"),
  body("email").isEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("birthday")
    .isISO8601()
    .toDate()
    .withMessage("La fecha de nacimiento es obligatoria y debe ser válida"),
  body("phone")
    .matches(/^\d{10}$/)
    .withMessage("El teléfono debe ser de 10 dígitos"),
  body("address").notEmpty().withMessage("La dirección es obligatoria"),
  body("rfc")
    .matches(/^([A-ZÑ&]{3,4}) ?-? ?(\d{2})(\d{2})(\d{2}) ?-? ?([A-Z\d]{3})$/i)
    .withMessage("El RFC no es válido"),
];

export default validator;
