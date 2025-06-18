// Estado inicial del formulario
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
    },
    rate: "",
    photos: "",
    maxGuest: "",
    latitude: "",
    longitude: "",
};

// Este estado inicial se utiliza para el formulario de creación de nuevas propiedades
export default initialState;