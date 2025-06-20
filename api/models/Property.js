// Modelo Property para propiedades tipo Airbnb
// Define la estructura y validaciones de una propiedad en la base de datos
import { Schema, model } from "mongoose";

// Esquema principal de la propiedad
const propertySchema = new Schema({
  // Tipo de propiedad (solo valores permitidos)
  propertyType: {
    type: String,
    enum: ['loft', 'penthouse', 'room', 'house', 'apartment'],
    required: true
  },
  // Dirección completa de la propiedad
  address: {
    street: { type: String, required: true }, // Calle
    streetNumber: { type: Number, required: true }, // Número
    neighborhood: { type: String, required: true }, // Colonia/Barrio
    zipCode: { type: Number, required: true }, // Código postal
    state: { type: String, required: true }, // Estado
    city: { type: String, required: true }, // Ciudad
    country: { type: String, required: true } // País
  },
  // Cantidad de habitaciones
  rooms: { type: Number, required: true },
  // Cantidad de baños
  baths: { type: Number, required: true },
  // Lugares de estacionamiento
  parkingSpots: { type: Number, required: true },
  // Amenidades disponibles en la propiedad
  amenities: {
    internet: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    jacuzzi: { type: Boolean, default: false },
    grill: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false },
    fridge: { type: Boolean, default: false },
    gym: { type: Boolean, default: false },
    washer: { type: Boolean, default: false },
    dryer: { type: Boolean, default: false },
    petFriendly: { type: Boolean, default: false }
  },
  // Tarifa por noche
  rate: { type: Number, required: true },
  // URLs de fotos de la propiedad
  photos: [{ type: String }],
  // Máximo de huéspedes permitidos
  maxGuest: { type: Number, required: true },
  // Coordenadas geográficas en formato GeoJSON
  coords: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitud, latitud]
  },
  // Título de la propiedad
  title: { type: String, required: true },
  // Descripción de la propiedad
  description: { type: String, required: true }
});

// Índice geoespacial para búsquedas por ubicación
propertySchema.index({ coords: '2dsphere' });

// Exporta el modelo Property
export default model("Property", propertySchema);
