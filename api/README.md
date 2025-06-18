# Endpoints de Propiedades (Properties)

Este módulo gestiona las propiedades tipo Airbnb en el sistema.

## Crear propiedad

**POST** `/api/properties`

Registra una nueva propiedad. Solo los usuarios con rol `host` pueden acceder a este endpoint.

### Body (JSON)
```json
{
  "propertyType": "loft",
  "address": {
    "street": "Calle Falsa",
    "streetNumber": 123,
    "neighborhood": "Centro",
    "zipCode": 12345,
    "state": "CDMX",
    "city": "Ciudad de México",
    "country": "México"
  },
  "rooms": 2,
  "baths": 1,
  "parkingSpots": 1,
  "amenities": {
    "internet": true,
    "pool": false
  },
  "rate": 1000,
  "photos": ["url1.jpg", "url2.jpg"],
  "maxGuest": 4,
  "coords": {
    "type": "Point",
    "coordinates": [-99.1332, 19.4326]
  }
}
```

### Respuestas
- **201 Created**: Propiedad creada correctamente.
- **400 Bad Request**: Error de validación en los datos enviados.
- **403 Forbidden**: Solo hosts pueden registrar propiedades.

### Notas
- Todos los campos marcados como obligatorios deben ser enviados.
- El endpoint está protegido por un middleware que valida el rol del usuario.
- Se recomienda enviar un token de autenticación cuando el sistema esté implementado.

---

> Para dudas sobre el uso de este endpoint, consulta al responsable del módulo de propiedades.
