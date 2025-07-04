import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";
import { getProfile } from "../services/api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(setUser).catch(console.error);
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      {user ? (
        <ProfileForm user={user} setUser={setUser} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default ProfilePage;
