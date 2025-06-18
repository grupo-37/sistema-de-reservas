import { useState, useEffect, useRef } from "react";
import initialState from "./formInitialState";
import validateProperty from "./validateProperty";

const LOCAL_STORAGE_KEY = "newPropertyForm";
const LOCAL_STORAGE_SUBMIT_FLAG = "propertyFormSubmitted";

export function usePropertyForm() {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const isFirstLoad = useRef(true);
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(() =>
        localStorage.getItem(LOCAL_STORAGE_SUBMIT_FLAG) === "true"
    );

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            try {
                setForm(JSON.parse(saved));
            } catch {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        }
        isFirstLoad.current = false;
    }, []);

    useEffect(() => {
        if (!isFirstLoad.current && !submittedSuccessfully) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form));
        }
    }, [form, submittedSuccessfully]);

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
            const res = await fetch("http://localhost:8080/api/properties", {
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
                setSubmittedSuccessfully(true);
                localStorage.setItem(LOCAL_STORAGE_SUBMIT_FLAG, "true");
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

    return {
        form,
        errors,
        success,
        loading,
        handleChange,
        handleSubmit,
    };
}
