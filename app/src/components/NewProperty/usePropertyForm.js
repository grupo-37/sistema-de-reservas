import { useState, useEffect, useRef } from "react";
import initialState from "./initialState";
import validateProperty from "./validateProperty";

const LOCAL_STORAGE_KEY = "newPropertyForm";
const API_URL = import.meta.env.VITE_API_URL;

export function usePropertyForm() {
    // Inicializa el formulario con los datos de localStorage si existen
    const [form, setForm] = useState(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialState;
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const isFirstLoad = useRef(true);

    // Guardar automáticamente en localStorage cada vez que cambia el formulario, excepto en el primer render
    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form));
    }, [form]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("address.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
        } else if (name.startsWith("amenities.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({ ...prev, amenities: { ...prev.amenities, [key]: checked } }));
        } else {
            setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        const validationErrors = validateProperty(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/properties`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    address: {
                        ...form.address,
                        streetNumber: Number(form.address.streetNumber),
                        zipCode: Number(form.address.zipCode),
                    },
                    rooms: Number(form.rooms),
                    baths: Number(form.baths),
                    parkingSpots: Number(form.parkingSpots),
                    rate: Number(form.rate),
                    photos: form.photos ? form.photos.split(",").map((url) => url.trim()) : [],
                    maxGuest: Number(form.maxGuest),
                    coords: {
                        type: "Point",
                        coordinates: [Number(form.longitude), Number(form.latitude)],
                    },
                }),
            });
            if (res.status === 201) {
                setSuccess("Propiedad registrada exitosamente");
                localStorage.removeItem(LOCAL_STORAGE_KEY);
                setForm(initialState);
            } else {
                const data = await res.json();
                throw new Error(`Error: ${res.status} - ${data.message || "Error desconocido"}`);
            }
        } catch (err) {
            setErrors({ submit: err.message });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm(initialState);
        setErrors({});
        setSuccess("");
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    };

    return {
        form,
        errors,
        success,
        loading,
        handleChange,
        handleSubmit,
        resetForm,
    };
}
