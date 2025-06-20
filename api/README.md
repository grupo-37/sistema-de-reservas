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

#### Ejemplo de request

```
/api/properties?q=Mexico&sort=rate&order=desc&lat=19.43&lon=-99.13&range=5
```

#### Notas

* Si se usa geoespacial: el API devolverá propiedades cercanas ordenadas por distancia.
* Si no hay coordenadas: se ordena por el campo especificado.

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
