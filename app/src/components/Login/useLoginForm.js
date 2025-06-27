import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { userState } from "../../atoms/userAtom";
import api from "../../utils/api";

export const useLoginForm = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setStatusMessage("");
    setIsLoading(true);
    
    try {
      const response = await api.post("/auth/login", values);
      
      // El backend devuelve directamente los datos del usuario
      if (response.data._id && response.data.token) {
        const userData = {
          isAuthenticated: true,
          user: {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email
          },
          token: response.data.token
        };
        
        // Guardar en localStorage
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(userData.user));
        
        setUserState(userData);
        setStatusMessage("Login exitoso");
        
        // Redirigir al home después de 1 segundo
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setStatusMessage("Error en el login");
      }
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Error de conexión");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return {
    statusMessage,
    isLoading,
    handleSubmit
  };
};