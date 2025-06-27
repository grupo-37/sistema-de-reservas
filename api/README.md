# 🚀 API de Propiedades (Properties)

Este módulo gestiona las propiedades estilo Airbnb dentro del sistema. Permite crear, listar y filtrar propiedades con diferentes criterios, incluyendo búsqueda geoespacial.

## 📁 Estructura del módulo
- 📦 **controllers/**: Lógica de negocio de las rutas.
- 🔌 **routes/**: Definición de los endpoints.
- 🛢️ **models/**: Modelo de Mongoose para propiedades.
- 🧪 **validators/**: Validación de datos de entrada (por ejemplo con express-validator).

## ✨ Funcionalidades recientes
- ✅ **POST /api/properties**: Registro de nuevas propiedades con validación robusta.
- 🔍 **GET /api/properties**: Listado de propiedades con filtros por:
  - Texto en dirección (ciudad, estado, país…)
  - Ordenamiento por tarifa u otros campos
  - 📌 Búsqueda geoespacial: filtra por propiedades cercanas a una coordenada (lat/lon + rango en km)
- ⚠️ Mejor manejo de errores y respuestas consistentes.

## 📌 Endpoints

### ➕ Crear propiedad
**POST** `/api/properties`

Registra una nueva propiedad. Solo los usuarios con rol `host` pueden acceder.

#### Body esperado (JSON)

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
````

#### Respuestas

* **201 Created**: Propiedad creada exitosamente.
* **400 Bad Request**: Error de validación en los datos enviados.
* **403 Forbidden**: No autorizado para registrar propiedades.

---

### 🔍 Listar propiedades

**GET** `/api/properties`

Permite obtener un listado de propiedades aplicando filtros opcionales.

#### Query params

| Param                 | Descripción                                       |
| --------------------- | ------------------------------------------------- |
| `q`                   | Búsqueda por ciudad, estado, país, calle, colonia |
| `sort`                | Campo por el cual ordenar (ej. `rate`)            |
| `order`               | `asc` o `desc`                                    |
| `offset`              | Desde qué elemento iniciar                        |
| `limit`               | Cantidad de resultados a devolver                 |
| `lat`, `lon`, `range` | Búsqueda geoespacial (coordenadas + rango en km)  |
| `pool`, `internet`, ... | Filtra por amenidades (ej. `pool=true`)                |
| `rate_min`, `rate_max` | Rango de tarifa por noche (ej. `rate_min=1000&rate_max=5000`) |
| `propertyType`, `rooms`, `baths`, ... | Filtra por cualquier campo del modelo |
| `title`                | Búsqueda por título (usando `q`)                      |

#### Ejemplos de URLs para pruebas

**URLs básicas:**
```
http://localhost:8080/api/properties
http://localhost:8080/api/properties?limit=5
http://localhost:8080/api/properties?q=casa
http://localhost:8080/api/properties?q=mexico
```

**URLs con filtros específicos:**
```
http://localhost:8080/api/properties?propertyType=house
http://localhost:8080/api/properties?rooms=3&baths=2
http://localhost:8080/api/properties?rate_min=100&rate_max=500
http://localhost:8080/api/properties?pool=true&kitchen=true
```

**URLs con ordenamiento:**
```
http://localhost:8080/api/properties?sort=rate&order=desc
http://localhost:8080/api/properties?sort=rooms&order=asc&limit=3
```

**URLs combinadas (más realistas):**
```
http://localhost:8080/api/properties?q=playa&propertyType=house&pool=true&limit=5
http://localhost:8080/api/properties?rooms=2&rate_min=200&sort=rate&order=asc
http://localhost:8080/api/properties?q=centro&baths=2&kitchen=true&internet=true
```

**URL geoespacial (búsqueda por ubicación):**
```
http://localhost:8080/api/properties?lat=19.4326&lon=-99.1332&range=5&limit=10
http://localhost:8080/api/properties?lat=19.4326&lon=-99.1332  # Usa 1km por defecto
```

#### Notas

* Ahora puedes filtrar por amenidades usando solo el nombre (`pool=true`, `internet=true`, etc.).
* El campo `q` busca coincidencias en título y dirección.
* Puedes combinar cualquier filtro del modelo en la query.

---

## 👥 Colaboradores

* <img src="https://github.com/isaacmb-alfa.png" width="32" height="32" style="border-radius:50%;vertical-align:middle;" alt="isaacmb-alfa"/> [isaacmb-alfa](https://github.com/isaacmb-alfa) – Endpoints de registro y listado, validación, búsqueda geoespacial.

> ℹ️ Cuando agregues nuevas rutas o funciones, documenta aquí tu contribución para que el equipo pueda seguir el desarrollo. Añade tu usuario y una breve descripción de lo que implementaste.

---

## 📝 Cómo colaborar

* 🚀 Documenta cada endpoint nuevo o cambio en la funcionalidad.
* 📌 Si agregas validación, middlewares o lógica compleja, explícalo brevemente aquí.
* 🏷️ Añade tu nombre en **Colaboradores** junto con un emoji o ícono que describa tu aporte.

---

## 🛠️ Requisitos de índices

> Este proyecto usa índices geoespaciales. Asegúrate de crearlos en tu base de datos:

```bash
db.properties.createIndex({ coords: "2dsphere" })
```

---

## 🆕 Changelog reciente

- 20/06/2025: 
  - 🔄 **Mejora en búsqueda geoespacial:**
    - Ahora el endpoint GET `/api/properties` soporta filtro por ubicación usando `$near` y `$maxDistance` (parámetros `lat`, `lon`, `range` en km).
    - Se permite combinar búsqueda geoespacial con otros filtros y paginación.
    - El ordenamiento solo se aplica si no se usa filtro geoespacial, siguiendo la documentación oficial de MongoDB.
  - 🐞 **Fix:**
    - Se corrigió el error relacionado con el uso de `$near` y `.sort()` simultáneamente.
    - Se documentó el uso correcto de índices geoespaciales y el formato de coordenadas.
  - ✨ **Nuevos filtros y mejoras:**
    - Se pueden filtrar amenidades usando solo el nombre (ej. `pool=true`).
    - Se agregó soporte para búsqueda por título (`q` busca en `title` y dirección).
    - Se agregó soporte para rango de tarifa (`rate_min`, `rate_max`).
    - Se pueden combinar múltiples filtros en la query.
    - Se agregaron los campos `title` y `description` como obligatorios en el modelo y la validación.
