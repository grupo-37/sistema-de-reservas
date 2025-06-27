import { body } from "express-validator";

const validator = [
    body("firstName")
        .isString()
        .notEmpty()
        .withMessage("El nombre es obligatorio"),
    body("lastName")
        .isString()
        .notEmpty()
        .withMessage("El apellido es obligatorio"),
    body("email").isEmail().withMessage("Correo electrónico inválido"),
    body("password")
        .isString()
        .isLength({ min: 10 })
        .withMessage("La contraseña debe tener al menos 10 caracteres"),
    body("birthday")
        .optional({ checkFalsy: true })
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage("La fecha de nacimiento debe tener formato válido (YYYY-MM-DD)" ),
    body("phone")
        .optional()
        .isMobilePhone("any")
        .withMessage("Número de teléfono inválido"),
    body("paymentMethod")
        .optional()
        .isString()
        .withMessage("Método de pago inválido"),
];

export default validator;
