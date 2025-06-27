import { useState } from 'react';
import api from '../../utils/api';
import initialState from './initialState';
import validateHost from './validateHost';

export function useHostForm() {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        const validationErrors = validateHost(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);
        try {
            await api.post('/auth/register/host', formData);
            setSuccess('¡Host registrado exitosamente!');
            setFormData(initialState);
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || err.message });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData(initialState);
        setErrors({});
        setSuccess('');
    };

    return {
        formData,
        errors,
        success,
        loading,
        handleChange,
        handleSubmit,
        resetForm
    };
}