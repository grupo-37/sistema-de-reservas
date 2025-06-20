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
    console.log('Error al crear propiedad:', error); // <-- Depuración
    // Manejo de errores y validaciones
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

// GET /api/properties?sort=rate&order=asc&q=cuernavaca&range=10&lat=18.92&lon=-99.23&offset=0&limit=10
export const listProperties = async (req, res) => {
    try {
        const {
            sort = "rate",
            order = "asc",
            q = "",
            range,
            lat,
            lon,
            offset = 0,
            limit = 10,
        } = req.query;

        const skip = parseInt(offset) || 0;
        const lim = parseInt(limit) || 10;
        const matchStage = {};

        // Búsqueda textual
        if (q) {
            const regex = new RegExp(q, "i");
            matchStage.$or = [
                { "address.city": regex },
                { "address.state": regex },
                { "address.country": regex },
                { "address.neighborhood": regex },
                { "address.street": regex },
            ];
        }

        // Si se proporciona lat/lon, usar aggregate + $geoNear
        if (lat && lon && range) {
            const aggregateQuery = [
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [parseFloat(lon), parseFloat(lat)],
                        },
                        distanceField: "distancia",
                        maxDistance: parseFloat(range) * 1000, // a metros
                        spherical: true,
                        query: matchStage,
                    },
                },
                { $skip: skip },
                { $limit: lim }
            ];

            // NOTA: No puedes usar $sort aquí por otros campos, solo por distancia si hace falta
            const [results, totalCount] = await Promise.all([
                Property.aggregate(aggregateQuery),
                Property.countDocuments(matchStage),
            ]);

            return res.json({ total: totalCount, properties: results });
        }

        // Si NO hay coordenadas, usar find() normal
        const sortObj = {};
        if (sort) sortObj[sort] = order === "desc" ? -1 : 1;

        const [results, totalCount] = await Promise.all([
            Property.find(matchStage).sort(sortObj).skip(skip).limit(lim),
            Property.countDocuments(matchStage),
        ]);

        return res.json({ total: totalCount, properties: results });

    } catch (error) {
        console.log("Error al listar propiedades:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
