import React from 'react';
import { useHostForm } from './useHostForm';

const RegisterHost = () => {
    const { formData, errors, success, loading, handleChange, handleSubmit } = useHostForm();

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Registro de Host</h1>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm" noValidate>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">Nombre:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Apellido:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthday" className="form-label">Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                className={`form-control ${errors.birthday ? 'is-invalid' : ''}`}
                                id="birthday"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                required
                            />
                            {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Teléfono:</label>
                            <input
                                type="tel"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Dirección:</label>
                            <textarea
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                id="address"
                                name="address"
                                rows="3"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            ></textarea>
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rfc" className="form-label">RFC:</label>
                            <input
                                type="text"
                                className={`form-control ${errors.rfc ? 'is-invalid' : ''}`}
                                id="rfc"
                                name="rfc"
                                value={formData.rfc}
                                onChange={handleChange}
                                required
                            />
                            {errors.rfc && <div className="invalid-feedback">{errors.rfc}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrar Host'}
                        </button>
                    </form>
                    {success && (
                        <div className="mt-3 alert alert-success" role="alert">
                            {success}
                        </div>
                    )}
                    {errors.submit && (
                        <div className="mt-3 alert alert-danger" role="alert">
                            {errors.submit}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterHost;