import { useState } from "react";
import { updateProfile } from "../services/api";

const ProfileForm = ({ user, setUser }) => {
  const [form, setForm] = useState({
    name: user.name || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(form);
      setUser({ ...user, ...updated });
      alert("Perfil actualizado con éxito");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Perfil de Usuario</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Campos editables */}
            <div className="mb-3">
              <label className="form-label">Nombre(s)</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido(s)</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Campos no editables */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ID de usuario</label>
              <input
                type="text"
                value={user._id}
                disabled
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cuenta verificada</label>
              <input
                type="text"
                value={user.verified ? "Sí" : "No"}
                disabled
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fecha de creación</label>
              <input
                type="text"
                value={new Date(user.createdAt).toLocaleString()}
                disabled
                className="form-control"
              />
            </div>

            {/* Resumen de propiedades */}
            <div className="mb-4">
              <label className="form-label">Propiedades registradas</label>
              {user.properties && user.properties.length > 0 ? (
                <ul className="list-group">
                  {user.properties.map((p, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                      {p.title || `Propiedad ${i + 1}`}
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => alert(`Detalles de: ${p.title || 'Propiedad'}`)}
                      >
                        Ver detalles
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No tienes propiedades registradas.</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
