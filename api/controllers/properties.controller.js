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

// GET /api/properties?sort=rate&order=asc&q=cuernavaca&range=10&lat=18.92&lon=-99.23&offset=0&limit=10&propertyType=house&rooms=5&baths=4&pool=true
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
            ...filters // Captura todos los demás query params
        } = req.query;

        const skip = parseInt(offset) || 0;
        const lim = parseInt(limit) || 10;
        const matchStage = {};

        // Búsqueda textual
        if (q) {
            const regex = new RegExp(q, "i");
            matchStage.$or = [
                { "title": regex }, // ahora busca también por título
                { "address.city": regex },
                { "address.state": regex },
                { "address.country": regex },
                { "address.neighborhood": regex },
                { "address.street": regex },
            ];
        }

        // Rango de precios (rate_min, rate_max) - procesar antes de los demás filtros
        if (filters.rate_min || filters.rate_max) {
            matchStage.rate = {};
            if (filters.rate_min) matchStage.rate.$gte = Number(filters.rate_min);
            if (filters.rate_max) matchStage.rate.$lte = Number(filters.rate_max);
            delete filters.rate_min;
            delete filters.rate_max;
        }

        // Filtros adicionales (propertyType, rooms, baths, amenities, etc.)
        Object.entries(filters).forEach(([key, value]) => {
            if (["sort", "order", "q", "range", "lat", "lon", "offset", "limit", "_id", "id"].includes(key)) return;
            // Si el filtro es una amenidad (pool, internet, etc.)
            const amenityKeys = [
                "internet", "pool", "jacuzzi", "grill", "kitchen", "fridge", "gym", "washer", "dryer", "petFriendly"
            ];
            if (amenityKeys.includes(key)) {
                matchStage[`amenities.${key}`] = value === "true";
            } else if (key.startsWith("amenities.")) {
                matchStage[key] = value === "true";
            } else if (!isNaN(value) && value !== "") {
                // Evita sobrescribir el filtro de rango de rate
                if (key === "rate" && matchStage.rate && (matchStage.rate.$gte || matchStage.rate.$lte)) return;
                matchStage[key] = Number(value);
            } else {
                matchStage[key] = value;
            }
        });

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
                { $limit: lim },
                { $project: { __v: 0, _id: 0 } },
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
            Property.find(matchStage, { __v: 0, _id: 0 }).sort(sortObj).skip(skip).limit(lim),
            Property.countDocuments(matchStage),
        ]);

        return res.json({ total: totalCount, properties: results });

    } catch (error) {
        console.log("Error al listar propiedades:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
