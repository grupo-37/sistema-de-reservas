// Estado inicial del formulario de nueva propiedad
const initialState = {
  title: "",
  description: "",
  propertyType: "",
  address: {
    street: "",
    streetNumber: "",
    neighborhood: "",
    zipCode: "",
    state: "",
    city: "",
    country: "",
  },
  rooms: "",
  baths: "",
  parkingSpots: "",
  amenities: {
    internet: false,
    pool: false,
    jacuzzi: false,
    grill: false,
    kitchen: false,
    fridge: false,
    gym: false,
    washer: false,
    dryer: false,
    petFriendly: false,
  },
  rate: "",
  photos: "",
  maxGuest: "",
  latitude: "",
  longitude: "",
};

export default initialState;
