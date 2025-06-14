// Controlador para operaciones sobre propiedades (Property)
import Property from "../models/Property.js";

// Crea una nueva propiedad en la base de datos
export const createProperty = async (req, res) => {
  try {
    // Crea una instancia del modelo Property con los datos recibidos
    const property = new Property(req.body);
    // Guarda la propiedad en la base de datos
    await property.save();
    // Responde con la propiedad creada
    res.status(201).json(property);
  } catch (error) {
    // Manejo de errores y validaciones
    res.status(400).json({ error: error.message });
  }
};
