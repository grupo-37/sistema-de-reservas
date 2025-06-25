import { Router } from "express";
import { registerUserGuest } from "../controllers/auth.controller.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";


const saltRounds = 10;

bcrypt.genSalt(saltRounds, (err, salt) => {
  if (err) {
    console.error("Error generando el salt:", err);
    return;
  }

  console.log("Salt generado:", salt);

  
  const userPassword = "password";
  bcrypt.hash(userPassword, salt, (err, hash) => {
    if (err) {
      console.error("Error hasheando:", err);
      return;
    }
    console.log("Hash generado:", hash);
  });
});

const contraseñaDelUsuario = 'userPassword';
const contraseñaHashAlmacenada = 'hashed_password_from_database';

bcrypt.compare(contraseñaDelUsuario, contraseñaHashAlmacenada, (err, result) => {
    if (err) {

        console.error('Error en la comparacion de contraseña:', err);
        return;
    }

if (result) {
    
    console.log('Las contraseñas coinciden');
} else {

    console.log('las contraseñas no coinciden');
}
});




const router = Router();

// Middleware para manejar errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};



router.post(
  "/register/guest",
  [
    
    body("firstName")
      .isString()
      .notEmpty()
      .withMessage("El nombre es obligatorio"),
    body("lastName")
      .isString()
      .notEmpty()
      .withMessage("El apellido es obligatorio"),
    body("email")
      .isEmail()
      .withMessage("Correo electrónico inválido"),
    body("password")
      .isString()
      .isLength({ min: 10 })
      .withMessage("La contraseña debe tener al menos 10 caracteres"),
    body("birthday")
      .optional({ checkFalsy: true })
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage("La fecha de nacimiento debe tener formato válido (YYYY-MM-DD)"),
    body("phone")
      .optional()
      .isMobilePhone("any")
      .withMessage("Número de teléfono inválido"),
    body("paymentMethod")
      .optional()
      .isString()
      .withMessage("Método de pago inválido"),
    validate
  ],
  registerUserGuest
);

export default router;
