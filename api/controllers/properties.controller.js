// Controlador para operaciones sobre propiedades (Property)
import Property, { AMENITY_KEYS } from "../models/Property.js";

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
            range = 1, // 1 km por defecto
            lat,
            lon,
            offset = 0,
            limit = 10,
            rate_min,
            rate_max,
            ...filters
        } = req.query;

        const skip = Math.max(0, parseInt(offset) || 0);
        const lim = Math.min(100, Math.max(1, parseInt(limit) || 10));
        const matchStage = {};

        // Búsqueda textual optimizada
        if (q.trim()) {
            const regex = new RegExp(q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "i");
            matchStage.$or = [
                { title: regex },
                { "address.city": regex },
                { "address.state": regex },
                { "address.country": regex },
                { "address.neighborhood": regex },
                { "address.street": regex }
            ];
        }

        // Rango de precios
        if (rate_min || rate_max) {
            matchStage.rate = {};
            if (rate_min && !isNaN(rate_min)) matchStage.rate.$gte = Number(rate_min);
            if (rate_max && !isNaN(rate_max)) matchStage.rate.$lte = Number(rate_max);
        }

        // Filtros adicionales optimizados
        for (const [key, value] of Object.entries(filters)) {
            if (["_id", "id"].includes(key) || !value) continue;
            
            matchStage[AMENITY_KEYS.includes(key) ? `amenities.${key}` : 
                     key.startsWith("amenities.") ? key : key] = 
                     AMENITY_KEYS.includes(key) || key.startsWith("amenities.") ? value === "true" :
                     !isNaN(value) ? Number(value) : value;
        }

        const projection = { __v: 0, _id: 0 };
        
        // Búsqueda geoespacial
        if (lat && lon && !isNaN(lat) && !isNaN(lon) && !isNaN(range)) {
            const [results, totalCount] = await Promise.all([
                Property.aggregate([
                    {
                        $geoNear: {
                            near: {
                                type: "Point",
                                coordinates: [parseFloat(lon), parseFloat(lat)]
                            },
                            distanceField: "distance",
                            maxDistance: parseFloat(range) * 1000,
                            spherical: true,
                            query: matchStage
                        }
                    },
                    { $skip: skip },
                    { $limit: lim },
                    { $project: projection }
                ]),
                Property.countDocuments(matchStage)
            ]);
            
            return res.json({ total: totalCount, properties: results });
        }

        // Búsqueda normal con ordenamiento
        const sortObj = sort ? { [sort]: order === "desc" ? -1 : 1 } : {};
        
        const [results, totalCount] = await Promise.all([
            Property.find(matchStage, projection).sort(sortObj).skip(skip).limit(lim),
            Property.countDocuments(matchStage)
        ]);

        res.json({ total: totalCount, properties: results });

    } catch (error) {
        console.log("Error al listar propiedades:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
