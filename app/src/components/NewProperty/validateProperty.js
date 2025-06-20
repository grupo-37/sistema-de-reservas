// Función para validar los datos del formulario de propiedad
export default function validateProperty(form) {
  const errors = {};
  if (!form.title) errors.title = "El título es obligatorio";
  if (!form.description) errors.description = "La descripción es obligatoria";
  if (!form.propertyType) errors.propertyType = "El tipo de propiedad es obligatorio";
  if (!form.address.street) errors.street = "La calle es obligatoria";
  if (!form.address.streetNumber || isNaN(form.address.streetNumber)) errors.streetNumber = "Número inválido";
  if (!form.address.neighborhood) errors.neighborhood = "El barrio es obligatorio";
  if (!form.address.zipCode || isNaN(form.address.zipCode)) errors.zipCode = "Código postal inválido";
  if (!form.address.state) errors.state = "El estado es obligatorio";
  if (!form.address.city) errors.city = "La ciudad es obligatoria";
  if (!form.address.country) errors.country = "El país es obligatorio";
  if (!form.rooms || isNaN(form.rooms) || Number(form.rooms) < 0) errors.rooms = "Habitaciones inválidas";
  if (!form.baths || isNaN(form.baths) || Number(form.baths) < 0) errors.baths = "Baños inválidos";
  if (!form.parkingSpots || isNaN(form.parkingSpots) || Number(form.parkingSpots) < 0) errors.parkingSpots = "Estacionamientos inválidos";
  if (!form.rate || isNaN(form.rate) || Number(form.rate) < 0) errors.rate = "Tarifa inválida";
  if (!form.maxGuest || isNaN(form.maxGuest) || Number(form.maxGuest) < 1) errors.maxGuest = "Máximo de huéspedes inválido";
  if (!form.latitude || isNaN(form.latitude)) {
    errors.latitude = "Latitud inválida";
  } else if (Number(form.latitude) < -90 || Number(form.latitude) > 90) {
    errors.latitude = "La latitud debe estar entre -90 y 90";
  }
  if (!form.longitude || isNaN(form.longitude)) {
    errors.longitude = "Longitud inválida";
  } else if (Number(form.longitude) < -180 || Number(form.longitude) > 180) {
    errors.longitude = "La longitud debe estar entre -180 y 180";
  }
  if (form.photos && form.photos.split(",").some(url => !url.trim())) errors.photos = "Formato de fotos inválido";
  return errors;
}
