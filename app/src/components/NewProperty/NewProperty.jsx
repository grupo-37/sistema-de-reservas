import { useState, useEffect, useRef } from "react";
import validateProperty from "./validateProperty";
import initialState from "./initialState";
import PropertyFormFields from "./PropertyFormFields";

const LOCAL_STORAGE_KEY = "newPropertyForm";
const LOCAL_STORAGE_SUBMIT_FLAG = "propertyFormSubmitted";

const NewProperty = () => {
    // Estados principales
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const isFirstLoad = useRef(true); // bandera para evitar guardar en el primer render
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(() => {
        return localStorage.getItem(LOCAL_STORAGE_SUBMIT_FLAG) === "true";
    });


    // Cargar datos guardados en localStorage al montar el componente
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setForm(parsed);
            } catch {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        } else {
            localStorage.setItem(LOCAL_STORAGE_SUBMIT_FLAG, "false");
        }
        isFirstLoad.current = false;
    }, []);

    // Guardar automáticamente en localStorage cada vez que cambia el formulario, excepto en el primer render
    useEffect(() => {
        if (!isFirstLoad.current && !submittedSuccessfully) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form));
        }
    }, [form, submittedSuccessfully]);

    useEffect(() => {
        if (submittedSuccessfully && JSON.stringify(form) !== JSON.stringify(initialState)) {
            setSubmittedSuccessfully(false);
            localStorage.removeItem(LOCAL_STORAGE_SUBMIT_FLAG);
        }
    }, [form]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("address.")) {
            const key = name.split(".")[1];
            setForm({ ...form, address: { ...form.address, [key]: value } });
        } else if (name.startsWith("amenities.")) {
            const key = name.split(".")[1];
            setForm({ ...form, amenities: { ...form.amenities, [key]: type === "checkbox" ? checked : value } });
        } else {
            setForm({ ...form, [name]: type === "checkbox" ? checked : value });
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        const validationErrors = validateProperty(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;
        setLoading(true);
        // Construir el objeto que se enviará
        const propertyData = {
            title: form.title,
            description: form.description,
            propertyType: form.propertyType,
            address: {
                street: form.address.street,
                streetNumber: Number(form.address.streetNumber),
                neighborhood: form.address.neighborhood,
                zipCode: Number(form.address.zipCode),
                state: form.address.state,
                city: form.address.city,
                country: form.address.country,
            },
            rooms: Number(form.rooms),
            baths: Number(form.baths),
            parkingSpots: Number(form.parkingSpots),
            amenities: {
                internet: form.amenities.internet,
                pool: form.amenities.pool,
            },
            rate: Number(form.rate),
            photos: form.photos ? form.photos.split(",").map(url => url.trim()) : [],
            maxGuest: Number(form.maxGuest),
            coords: {
                type: "Point",
                coordinates: [Number(form.longitude), Number(form.latitude)],
            },
        };
        try {
            const res = await fetch("http://localhost:8080/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(propertyData),
            });
            if (res.status === 201) {
                setSuccess("Propiedad registrada exitosamente");
                localStorage.setItem(LOCAL_STORAGE_SUBMIT_FLAG, "true"); 
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                setForm(initialState);
            } else {
                throw new Error(`Error al registrar la propiedad. Código: ${res.status}`);
            }
        } catch (err) {
            setSuccess("");
            setErrors({ submit: err.message });
        } finally {
            setLoading(false);
        }
    };

    // --- Renderizado del formulario ---
    return (
        <form onSubmit={handleSubmit} noValidate>
            <PropertyFormFields
                form={form}
                errors={errors}
                handleChange={handleChange}
                setForm={setForm}
                setErrors={setErrors}
                setSuccess={setSuccess}
                initialState={initialState}
                loading={loading}
            />
            {success && <p className="alert alert-success">{success}</p>}
            {errors.submit && <p className="alert alert-danger">{errors.submit}</p>}
            
            <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                {loading ? "Registrando..." : "Registrar"}
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                    setForm(initialState);
                    localStorage.removeItem("newPropertyForm");
                    setErrors({});
                    setSuccess("");
                }}
                disabled={loading}
            >
                Limpiar formulario
            </button>
            
        </form>
    );
};

export default NewProperty;
