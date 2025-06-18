
// eslint-disable-next-line no-unused-vars
const PropertyFormFields = ({ form, handleChange, errors, setErrors, setSuccess, initialState, loading }) => (
    <>
        <div className="container mt-4">
            <h2>Registrar nueva propiedad</h2>
            {/* Título y descripción */}
            <div className="mb-3">
                <label className="form-label">Título</label>
                <input type="text" className={`form-control${errors.title ? " is-invalid" : ""}`} name="title" value={form.title} onChange={handleChange} />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea className={`form-control${errors.description ? " is-invalid" : ""}`} name="description" value={form.description} onChange={handleChange} />
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
                    <input type="text" className={`form-control${errors.street ? " is-invalid" : ""}`} name="address.street" value={form.address.street} onChange={handleChange} />
                    {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Número</label>
                    <input type="number" className={`form-control${errors.streetNumber ? " is-invalid" : ""}`} name="address.streetNumber" value={form.address.streetNumber} onChange={handleChange} />
                    {errors.streetNumber && <div className="invalid-feedback">{errors.streetNumber}</div>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Colonia</label>
                    <input type="text" className={`form-control${errors.neighborhood ? " is-invalid" : ""}`} name="address.neighborhood" value={form.address.neighborhood} onChange={handleChange} />
                    {errors.neighborhood && <div className="invalid-feedback">{errors.neighborhood}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Código Postal</label>
                    <input type="number" className={`form-control${errors.zipCode ? " is-invalid" : ""}`} name="address.zipCode" value={form.address.zipCode} onChange={handleChange} />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Estado</label>
                    <input type="text" className={`form-control${errors.state ? " is-invalid" : ""}`} name="address.state" value={form.address.state} onChange={handleChange} />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Ciudad</label>
                    <input type="text" className={`form-control${errors.city ? " is-invalid" : ""}`} name="address.city" value={form.address.city} onChange={handleChange} />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">País</label>
                    <input type="text" className={`form-control${errors.country ? " is-invalid" : ""}`} name="address.country" value={form.address.country} onChange={handleChange} />
                    {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                </div>
            </div>
            {/* Habitaciones, baños, estacionamientos */}
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Habitaciones</label>
                    <input type="number" className={`form-control${errors.rooms ? " is-invalid" : ""}`} name="rooms" value={form.rooms} onChange={handleChange} />
                    {errors.rooms && <div className="invalid-feedback">{errors.rooms}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Baños</label>
                    <input type="number" className={`form-control${errors.baths ? " is-invalid" : ""}`} name="baths" value={form.baths} onChange={handleChange} />
                    {errors.baths && <div className="invalid-feedback">{errors.baths}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Estacionamientos</label>
                    <input type="number" className={`form-control${errors.parkingSpots ? " is-invalid" : ""}`} name="parkingSpots" value={form.parkingSpots} onChange={handleChange} />
                    {errors.parkingSpots && <div className="invalid-feedback">{errors.parkingSpots}</div>}
                </div>
            </div>
            {/* Amenidades */}
            <h5>Amenidades</h5>
            {/* Puedes agregar más amenidades aquí según la validación del backend */}
            <div className="form-check form-switch mb-2">
                <input className="form-check-input" type="checkbox" name="amenities.internet" checked={form.amenities.internet} onChange={handleChange} id="internetCheck" />
                <label className="form-check-label" htmlFor="internetCheck">Internet</label>
            </div>
            <div className="form-check form-switch mb-2">
                <input className="form-check-input" type="checkbox" name="amenities.pool" checked={form.amenities.pool} onChange={handleChange} id="poolCheck" />
                <label className="form-check-label" htmlFor="poolCheck">Piscina</label>
            </div>
            {/* Ejemplo para agregar más amenidades:
        <div className="form-check form-switch mb-2">
          <input className="form-check-input" type="checkbox" name="amenities.jacuzzi" checked={form.amenities.jacuzzi || false} onChange={handleChange} id="jacuzziCheck" />
          <label className="form-check-label" htmlFor="jacuzziCheck">Jacuzzi</label>
        </div>
        */}
            {/* Tarifa, máximo de huéspedes, fotos */}
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">Tarifa</label>
                    <input type="number" className={`form-control${errors.rate ? " is-invalid" : ""}`} name="rate" value={form.rate} onChange={handleChange} />
                    {errors.rate && <div className="invalid-feedback">{errors.rate}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Máximo de huéspedes</label>
                    <input type="number" className={`form-control${errors.maxGuest ? " is-invalid" : ""}`} name="maxGuest" value={form.maxGuest} onChange={handleChange} />
                    {errors.maxGuest && <div className="invalid-feedback">{errors.maxGuest}</div>}
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Fotos (URLs separadas por coma)</label>
                    <input type="text" className={`form-control${errors.photos ? " is-invalid" : ""}`} name="photos" value={form.photos} onChange={handleChange} />
                    {errors.photos && <div className="invalid-feedback">{errors.photos}</div>}
                </div>
            </div>
            {/* Coordenadas */}
            <h5>Ubicación (coordenadas)</h5>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Latitud</label>
                    <input type="number" className={`form-control${errors.latitude ? " is-invalid" : ""}`} name="latitude" value={form.latitude} onChange={handleChange} />
                    {errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Longitud</label>
                    <input type="number" className={`form-control${errors.longitude ? " is-invalid" : ""}`} name="longitude" value={form.longitude} onChange={handleChange} />
                    {errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
                </div>
            </div>
        </div>
    </>
);
export default PropertyFormFields;
