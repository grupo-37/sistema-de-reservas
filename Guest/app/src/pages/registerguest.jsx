import React, { useState } from 'react';

const RegisterGuest= () => {
    // Estado para manejar los valores del formulario
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthday: '',
        phone: '',
        paymentmethod: '',
        role: 'guest', // Valor por defecto según el ticket
        verified: false // Valor por defecto según el ticket
    });

    // Estado para manejar mensajes de respuesta (éxito/error)
    const [responseMessage, setResponseMessage] = useState({
        text: '',
        type: '' // 'success', 'danger', 'warning'
    });

    // Maneja cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Comportamiento por defecto del formulario

        // Resetear mensajes de respuesta
        setResponseMessage({ text: '', type: '' });

        // Validación básica de campos requeridos 
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'birthday', 'phone', 'paymentmethod'];
        const allFieldsFilled = requiredFields.every(field => formData[field].trim() !== '');

        if (!allFieldsFilled) {
            setResponseMessage({
                text: 'Completa los campos requeridos, por favor.',
                type: 'warning'
            });
            return;
        }

        try {
            // Realiza la petición POST al endpoint del API
            const response = await fetch('/api/auth/register/guest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage({
                    text: '¡Te has registrado exitosamente!',
                    type: 'success'
                });
                // Limpia el formulario después del éxito
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    birthday: '',
                    phone: '',
                    paymentmethod: '',
                    role: 'guest',
                    verified: false
                });
            } else {
                // Manejo de errores del API
                const errorMessage = data.message || 'Ocurrió un error al registrarte.';
                setResponseMessage({
                    text: `Error: ${errorMessage}`,
                    type: 'danger'
                });
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            setResponseMessage({
                text: 'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.',
                type: 'danger'
            });
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Registro de Guest </h1>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Apellido:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthday" className="form-label">Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="birthday"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Teléfono:</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Dirección:</label>
                            <textarea
                                className="form-control"
                                id="address"
                                name="address"
                                rows="3"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentmethod" className="form-label">Paymentmethod:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="paymentmethod"
                                name="paymentmethod"
                                value={formData.paymentmethod}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Registrar Guest </button>
                    </form>
                    {responseMessage.text && (
                        <div className={`mt-3 alert alert-${responseMessage.type}`} role="alert">
                            {responseMessage.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterHost;