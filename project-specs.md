Sistema de reservas
Autenticación ✅
Gestión de espacios
Calendario de reservas
Reservas
Mapa de ubicación
(Reseñas)

# Requerimientos

## Autenticación

El sistema cuenta con 3 roles para los usuarios

- Admin
- Host
- Guest

1. Las personas que se quieran registrar como host deberán ingresar los siguientes datos:

   - nombre
   - apellidos
   - fecha de nacimiento
   - dirección
   - email
   - contraseña
   - teléfono
   - rfc

2. El usuario administrador ya estará pre cargado en el sistema y no se podrá registrar ningún otro

3. Para registrarse como inquilino (Guest) la persona deber registrar los siguientes datos:

   - nombre
   - apellidos
   - fecha de nacimiento
   - email
   - contraseña
   - teléfono

4. Los usuarios que recién se registren quedarán con estado pendiente de verificación hasta que visiten el enlace que se les envia al correo electrónico para validarlo

## Propiedades

5. Los usuarios con rol Host pueden registrar a su nombre propiedades para que otros usuarios pas puedan apartar.
   Los datos necesarios para registrar una propiedad son:

   - tipo (loft, ph, habitación, casa, depa, rancho)
   - Calle
   - Ext
   - Interior
   - Colonia
   - Código postal
   - Estado
   - Municipio o ciudad
   - País
   - Cantidad de habitaciones
   - Cantidad de baños
   - Cantidad de estacionamientos
   - Amenidades ?
   - Luz
   - Internet
   - Alberca
   - Cocina
   - Gimnasio
   - Precio por noche
   - Fotos
   - Cantidad de huéspedes permitidos

6. Los hosts pueden editar los datos de sus propiedades

## Reservas

7. Los hosts pueden elegir los dias de la semana en los cuales los usuarios con rol guest podrán apartar, esto se puede hacer de manera individual por cada propiedad del usuario host

8. Los usuarios guest pueden ver las propiedades disponibles usando los siguientes filtros de búsqueda:

   - Rango de fechas
   - Rango de precios
   - Tipo de propiedad
   - Ubicación
   - Amenidades

   > El resultado de la búsqueda solo contiene propiedades que tengan disponibilidad todos los días seleccionados en el filtro

9. Las propiedades listadas en las búsqueda solo mostraran los siguientes datos:

   - Primera foto
   - Tipo de propiedad
   - precio
   - ubicación

10. Cuando un usuario elige una propiedad como resultado de su búsqueda, podrá ver los detalles de la misma en el mismo lugar donde podrá dar clic al botón de reservar. Los datos mostrados en esta vista son:
    - Ubicación en mapa
    - Amenidades
    - Tipo de propiedad
    - Fotos
    - Datos de
    - Calendario para elegir fechas

# Rutas front

## Autenticación

- /register/host Pagina para registrar hosts ✅
- /register/guest Página para registrar guests ✅
- /verify/:token Página para verificar el correo electrónico
- /login Págiona para hacer login ✅
- /profile ? Página para ver y editar los datos del perfil ✅
- /reset Página para cuando olvidas contraseña
- /reset/:token Págian para cambiar contraseña después de darle clic al enlace del correo

## Dashboard

- /dashboard/admin ?
- /dashboard/host Página donde donde se ven algunos datos de mis propiedades y la lista de las mismas
- /dashboard/guest Página para ver mi reserva actual, preview del historial de reservas y sugerencias

## Propiedades

- /dashboard/host/properties/new Página para registrar una propiedad nueva ✅
- /dashboard/host/properties/:id Página para ver una propiedad y sus detalles ✅
- /dashboard/host/properties/:id/edit? Página para editar propiedad ?
- /properties Página para listar filtrar y ordenar propiedades
- /properties/:id Pagina de detalle de una propiedad

## Reservaciones

- /reservations/:id/pay
- /dashboard/guest/reservations Página para ver mis reservaciones como huésped
- /dashboard/guest/reservations/:id Página ver el detalle de la reservación
- /dashboard/host/reservations Página para ver las reservaciones de mis propiedades

# Rutas Back

## Autenticación

- /api/auth/register/host POST ✅
- /api/auth/register/guest POST ✅
- /api/auth/verify/:token PATCH
- /api/auth/login POST ✅
- /api/auth/reset PATCH

## Usuarios

- /api/profile GET Obtener los datos de mi perfil ✅
- /api/profile PUT Actualizar los datos de mi perfil ✅

## Propiedades

- /api/properties GET Lista de propiedades filtradas y paginadas
- /api/properties POST Registrar una propiedad ✅
- /api/properties/:id PUT Actualizar datos de una propiedad
- /api/properties/:id GET Obtener detalle de una propiedad
- /api/properties/:id DELETE Borrar una propiedad

## Reservas

- /api/reservations GET Ver mis reservaciones
- /api/reservations POST Crear una nueva reservación
- /api/reservations/:id GET Ver detalle de una reservación
- /api/reservations/:id/cancel PATCH Cancelar una reservación

# Modelos

## User

- firstName String
- lastName String
- email String
- password String
- role String
- verified Boolean default false
- (timestamp)

## Admin -> User

## Host -> User

- birthday Date
- phone String
- address String
- rfc String

## Guest -> User

- birthday Date
- phone String
- paymentMethod String

- Property

  - propertyType String enum (loft, penthouse, room, house, apartment)
  - address
    - street String
    - streetNumber Number
    - neighborhood String
    - zipCode Number
    - state String
    - city String
    - country String
  - rooms Number
  - baths Number
  - parkingSpots Number
  - amenities
    - internet Boolean default false
    - pool
    - jacuzzi
    - grill
    - kitchen
    - fridge
    - gym
    - washer
    - dryer
    - petFriendly
  - rate Number
  - photos [String]
  - maxGuest Number
  - coords GeoJSON

- Reservation

  - guest Guest
  - property Property
  - from Date
  - to Date
  - rate
  - total
