import Joi from "joi";

const hostSchema = Joi.object({
    firstName: Joi.string().required().messages({
        "string.empty": "El nombre es obligatorio"
    }),
    lastName: Joi.string().required().messages({
        "string.empty": "El apellido es obligatorio"
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        "string.email": "El email debe tener un formato válido",
        "string.empty": "El email es obligatorio"
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "La contraseña debe tener al menos 6 caracteres",
        "string.empty": "La contraseña es obligatoria"
    }),
    birthday: Joi.date().max('now').required().messages({
        "date.max": "La fecha de nacimiento no puede ser futura",
        "date.base": "La fecha de nacimiento es inválida",
        "any.required": "La fecha de nacimiento es obligatoria"
    }),
    phone: Joi.string().pattern(/^[0-9+\-\s()]+$/).required().messages({
        "string.pattern.base": "El teléfono debe contener solo números y caracteres válidos",
        "string.empty": "El teléfono es obligatorio"
    }),
    address: Joi.string().required().messages({
        "string.empty": "La dirección es obligatoria"
    }),
    rfc: Joi.string().pattern(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/).required().messages({
        "string.pattern.base": "El RFC debe tener un formato válido",
        "string.empty": "El RFC es obligatorio"
    }),
    role: Joi.string().valid('host').required(),
    verified: Joi.boolean().required()
});

export default function validateHost(form) {
    const { error } = hostSchema.validate(form, { abortEarly: false });
    const errors = {};
    if (error) {
        error.details.forEach((detail) => {
            const key = detail.path[0];
            errors[key] = detail.message;
        });
    }
    return errors;
}