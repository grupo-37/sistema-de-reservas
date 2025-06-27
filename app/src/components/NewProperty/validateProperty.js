import Joi from "joi";

// Esquema de validación con Joi
const propertySchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "El título es obligatorio"
  }),
  description: Joi.string().required().messages({
    "string.empty": "La descripción es obligatoria"
  }),
  propertyType: Joi.string().valid("loft", "penthouse", "room", "house", "apartment").required().messages({
    "any.only": "El tipo de propiedad es inválido",
    "string.empty": "El tipo de propiedad es obligatorio"
  }),
  address: Joi.object({
    street: Joi.string().required().messages({ "string.empty": "La calle es obligatoria" }),
    streetNumber: Joi.number().required().messages({ "number.base": "Número inválido" }),
    neighborhood: Joi.string().required().messages({ "string.empty": "El barrio es obligatorio" }),
    zipCode: Joi.number().required().messages({ "number.base": "Código postal inválido" }),
    state: Joi.string().required().messages({ "string.empty": "El estado es obligatorio" }),
    city: Joi.string().required().messages({ "string.empty": "La ciudad es obligatoria" }),
    country: Joi.string().required().messages({ "string.empty": "El país es obligatorio" })
  }),
  rooms: Joi.number().min(0).required().messages({ "number.base": "Habitaciones inválidas" }),
  baths: Joi.number().min(0).required().messages({ "number.base": "Baños inválidos" }),
  parkingSpots: Joi.number().min(0).required().messages({ "number.base": "Estacionamientos inválidos" }),
  amenities: Joi.object({
    internet: Joi.boolean(),
    pool: Joi.boolean(),
    jacuzzi: Joi.boolean(),
    grill: Joi.boolean(),
    kitchen: Joi.boolean(),
    fridge: Joi.boolean(),
    gym: Joi.boolean(),
    washer: Joi.boolean(),
    dryer: Joi.boolean(),
    petFriendly: Joi.boolean(),
  }),
  rate: Joi.number().min(0).required().messages({ "number.base": "Tarifa inválida" }),
  photos: Joi.string().allow("").optional(), // Se procesa como string, luego se convierte a array
  maxGuest: Joi.number().min(1).required().messages({ "number.base": "Máximo de huéspedes inválido" }),
  latitude: Joi.number().min(-90).max(90).required().messages({
    "number.base": "Latitud inválida",
    "number.min": "La latitud debe estar entre -90 y 90",
    "number.max": "La latitud debe estar entre -90 y 90"
  }),
  longitude: Joi.number().min(-180).max(180).required().messages({
    "number.base": "Longitud inválida",
    "number.min": "La longitud debe estar entre -180 y 180",
    "number.max": "La longitud debe estar entre -180 y 180"
  })
});

export default function validateProperty(form) {
  // Convertir fotos a string si es array (por compatibilidad)
  const formToValidate = {
    ...form,
    photos: Array.isArray(form.photos) ? form.photos.join(",") : form.photos
  };
  const { error } = propertySchema.validate(formToValidate, { abortEarly: false });
  const errors = {};
  if (error) {
    error.details.forEach((detail) => {
      // Para campos anidados como address.street, usar solo la última parte
      const key = detail.path[detail.path.length - 1];
      errors[key] = detail.message;
    });
  }
  return errors;
}
