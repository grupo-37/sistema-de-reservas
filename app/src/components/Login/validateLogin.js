import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato de correo inválido")
    .required("Correo requerido"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña requerida"),
});