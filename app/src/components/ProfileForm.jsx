import React, { useState } from "react";
import { updateProfile } from "../services/api";

const ProfileForm = ({ user, setUser }) => {
  const [form, setForm] = useState({
    name: user.name || "",
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={user.email}
          disabled
          className="border p-2 w-full bg-gray-100"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Guardar
      </button>
    </form>
  );
};

export default ProfileForm;
