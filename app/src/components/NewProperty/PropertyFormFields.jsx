import React from "react";

// Función para formatear la tarifa con separador de miles usando ' (solo visual)
// 1. Elimina cualquier carácter que no sea número
// 2. Aplica el separador de miles con '
function formatTarifa(value) {
    if (!value) return "";
    // Elimina todo lo que no sea número
    const num = value.toString().replace(/[^\d]/g, "");
    // Formatea con separador de miles '
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

// eslint-disable-next-line no-unused-vars
const PropertyFormFields = ({ form, handleChange, errors, setForm, setErrors, setSuccess, initialState, loading }) => (
    <>
        <div className="container mt-4">
            <h2>Registrar nueva propiedad</h2>
            {/* Título y descripción */}
            <div className="mb-3">
                <label className="form-label">Título</label>
                <input type="text" className={`form-control${errors.title ? " is-invalid" : ""}`} name="title" value={form.title} onChange={handleChange} placeholder="Ej: Casa en la playa" />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea className={`form-control${errors.description ? " is-invalid" : ""}`} name="description" value={form.description} onChange={handleChange} placeholder="Describe la propiedad..." />
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
            {/* Tipo de propiedad */}
            <div className="mb-3">
                <label className="form-label">Tipo de propiedad</label>
                <select
                    className={`form-control${errors.propertyType ? " is-invalid" : ""}`}
                    name="propertyType"
                    value={form.propertyType}
                    onChange={handleChange}
                >
                    <option value="">Selecciona una opción</option>
                    <option value="loft">Loft</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="room">Habitación</option>
                    <option value="house">Casa</option>
                    <option value="apartment">Departamento</option>
                </select>
                {errors.propertyType && <div className="invalid-feedback">{errors.propertyType}</div>}
            </div>
            {/* Dirección */}
            <h5>Dirección</h5>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Calle</label>
                    <input type="text" className={`form-control${errors.street ? " is-invalid" : ""}`} name="address.street" value={form.address.street} onChange={handleChange} placeholder="Ej: Calle Falsa" />
                    {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Número</label>
                    <input type="number" className={`form-control${errors.streetNumber ? " is-invalid" : ""}`} name="address.streetNumber" value={form.address.streetNumber} onChange={handleChange} placeholder="Ej: 1234" min="0"
                        onInput={e => e.target.value = e.target.value.replace(/[^\d]/g, "")}
                        onPaste={e => { if (!/^\d+$/.test(e.clipboardData.getData('text'))) e.preventDefault(); }}
                        onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} />
                    {errors.streetNumber && <div className="invalid-feedback">{errors.streetNumber}</div>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Colonia</label>
                    <input type="text" className={`form-control${errors.neighborhood ? " is-invalid" : ""}`} name="address.neighborhood" value={form.address.neighborhood} onChange={handleChange} placeholder="Ej: Centro" />
                    {errors.neighborhood && <div className="invalid-feedback">{errors.neighborhood}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Código Postal</label>
                    <input type="number" className={`form-control${errors.zipCode ? " is-invalid" : ""}`} name="address.zipCode" value={form.address.zipCode} onChange={handleChange} placeholder="Ej: 50150" min="0"
                        onInput={e => e.target.value = e.target.value.replace(/[^\d]/g, "")}
                        onPaste={e => { if (!/^\d+$/.test(e.clipboardData.getData('text'))) e.preventDefault(); }}
                        onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Estado</label>
                    <input type="text" className={`form-control${errors.state ? " is-invalid" : ""}`} name="address.state" value={form.address.state} onChange={handleChange} placeholder="Ej: CDMX" />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Ciudad</label>
                    <input type="text" className={`form-control${errors.city ? " is-invalid" : ""}`} name="address.city" value={form.address.city} onChange={handleChange} placeholder="Ej: Ciudad de México" />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">País</label>
                    <input type="text" className={`form-control${errors.country ? " is-invalid" : ""}`} name="address.country" value={form.address.country} onChange={handleChange} placeholder="Ej: México" />
                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                </div>
            </div>
            {/* Habitaciones, baños, estacionamientos */}
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Habitaciones</label>
                    <input type="number" className={`form-control${errors.rooms ? " is-invalid" : ""}`} name="rooms" value={form.rooms} onChange={handleChange} placeholder="Ej: 2" min="0"
                        onInput={e => e.target.value = e.target.value.replace(/[^\d]/g, "")}
                        onPaste={e => { if (!/^\d+$/.test(e.clipboardData.getData('text'))) e.preventDefault(); }}
                        onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} />
                    {errors.rooms && <div className="invalid-feedback">{errors.rooms}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Baños</label>
                    <input type="number" className={`form-control${errors.baths ? " is-invalid" : ""}`} name="baths" value={form.baths} onChange={handleChange} placeholder="Ej: 1" min="0"
                        onInput={e => e.target.value = e.target.value.replace(/[^\d]/g, "")}
                        onPaste={e => { if (!/^\d+$/.test(e.clipboardData.getData('text'))) e.preventDefault(); }}
                        onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} />
                    {errors.baths && <div className="invalid-feedback">{errors.baths}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Estacionamientos</label>
                    <input type="number" className={`form-control${errors.parkingSpots ? " is-invalid" : ""}`} name="parkingSpots" value={form.parkingSpots} onChange={handleChange} placeholder="Ej: 1" min="0"
                        onInput={e => e.target.value = e.target.value.replace(/[^\d]/g, "")}
                        onPaste={e => { if (!/^\d+$/.test(e.clipboardData.getData('text'))) e.preventDefault(); }}
                        onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} />
                    {errors.parkingSpots && <div className="invalid-feedback">{errors.parkingSpots}</div>}
                </div>
            </div>
            {/* Amenidades */}
            <h5>Amenidades</h5>
            <div className="row">
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.internet" checked={form.amenities.internet} onChange={handleChange} id="internetCheck" />
                        <label className="form-check-label" htmlFor="internetCheck">Internet</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.pool" checked={form.amenities.pool} onChange={handleChange} id="poolCheck" />
                        <label className="form-check-label" htmlFor="poolCheck">Piscina</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.jacuzzi" checked={form.amenities.jacuzzi} onChange={handleChange} id="jacuzziCheck" />
                        <label className="form-check-label" htmlFor="jacuzziCheck">Jacuzzi</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.grill" checked={form.amenities.grill} onChange={handleChange} id="grillCheck" />
                        <label className="form-check-label" htmlFor="grillCheck">Asador</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.kitchen" checked={form.amenities.kitchen} onChange={handleChange} id="kitchenCheck" />
                        <label className="form-check-label" htmlFor="kitchenCheck">Cocina</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.fridge" checked={form.amenities.fridge} onChange={handleChange} id="fridgeCheck" />
                        <label className="form-check-label" htmlFor="fridgeCheck">Refrigerador</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.gym" checked={form.amenities.gym} onChange={handleChange} id="gymCheck" />
                        <label className="form-check-label" htmlFor="gymCheck">Gimnasio</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.washer" checked={form.amenities.washer} onChange={handleChange} id="washerCheck" />
                        <label className="form-check-label" htmlFor="washerCheck">Lavadora</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.dryer" checked={form.amenities.dryer} onChange={handleChange} id="dryerCheck" />
                        <label className="form-check-label" htmlFor="dryerCheck">Secadora</label>
                    </div>
                </div>
                <div className="col-md-3 mb-2">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="amenities.petFriendly" checked={form.amenities.petFriendly} onChange={handleChange} id="petFriendlyCheck" />
                        <label className="form-check-label" htmlFor="petFriendlyCheck">Pet Friendly</label>
                    </div>
                </div>
            </div>
            {/* Tarifa, máximo de huéspedes, fotos */}
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Tarifa</label>
                    {/*
                      El input muestra la tarifa formateada con separador de miles,
                      pero al cambiar el valor, se eliminan los separadores y solo se guarda el número real en el estado
                    */}
                    <input
                        type="text"
                        className={`form-control${errors.rate ? " is-invalid" : ""}`}
                        name="rate"
                        value={formatTarifa(form.rate)}
                        placeholder="Ej: 10'000"
                        onChange={e => {
                            // Elimina separadores y guarda solo el número
                            const raw = e.target.value.replace(/'/g, "");
                            // Solo permitir números
                            if (/^\d*$/.test(raw)) {
                                handleChange({
                                    target: {
                                        name: "rate",
                                        value: raw,
                                        type: "text"
                                    }
                                });
                            }
                        }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    {errors.rate && <div className="invalid-feedback">{errors.rate}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Máximo de huéspedes</label>
                    <input type="number" className={`form-control${errors.maxGuest ? " is-invalid" : ""}`} name="maxGuest" value={form.maxGuest} onChange={handleChange} placeholder="Ej: 4" min="1"
                        onInput={e => e.target.value = e.target.value.replace(/[^\d]/g, "")}
                        onPaste={e => { if (!/^\d+$/.test(e.clipboardData.getData('text'))) e.preventDefault(); }}
                        onKeyDown={e => ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault()} />
                    {errors.maxGuest && <div className="invalid-feedback">{errors.maxGuest}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Fotos (URLs separadas por coma)</label>
                    <input type="text" className={`form-control${errors.photos ? " is-invalid" : ""}`} name="photos" value={form.photos} onChange={handleChange} placeholder="Ej: url1.jpg, url2.jpg" />
                    {errors.photos && <div className="invalid-feedback">{errors.photos}</div>}
                </div>
            </div>
            {/* Coordenadas */}
            <h5>Ubicación (coordenadas)</h5>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Latitud</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="^-?\\d*(\\.\\d*)?$"
                        className={`form-control${errors.latitude ? " is-invalid" : ""}`}
                        name="latitude"
                        value={form.latitude}
                        onChange={handleChange}
                        placeholder="Ej: 19.4326"
                        min="-90"
                        max="90"
                    />
                    {errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Longitud</label>
                    <input
                        type="text"
                        inputMode="decimal"
                        pattern="^-?\\d*(\\.\\d*)?$"
                        className={`form-control${errors.longitude ? " is-invalid" : ""}`}
                        name="longitude"
                        value={form.longitude}
                        onChange={handleChange}
                        placeholder="Ej: -99.1332"
                        min="-180"
                        max="180"
                    />
                    {errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
                </div>
            </div>
        </div>
    </>
);
export default PropertyFormFields;
