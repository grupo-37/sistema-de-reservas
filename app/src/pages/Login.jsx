import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


// Validación con Yup
const LoginSchema = Yup.object().shape({
    email: Yup.string()
    .email("Formato de correo inválido")
    .required("Correo requerido"),
    password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña requerida"),
});

const Login = () => {
    const [statusMessage, setStatusMessage] = "";

    const handleSubmit = async (values, { setSubmitting }) => {
        setStatusMessage("");

        // try {
        // const response = await fetch("/api/auth/login", {
        //     method: "POST",
        //     headers: {
        //     "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(values),
        // });

        // if (!response.ok) {
        //     throw new Error("Error al iniciar sesión");
        // }

        // const data = await response.json();
        // console.log("Respuesta del servidor:", data);

        // setStatusMessage("Sesión iniciada correctamente");
        // } catch (error) {
        // console.error("Error:", error);
        // setStatusMessage("Error al iniciar sesión. Verifica tus datos.");
        // }
        
        setSubmitting(false);
    };

    return (
        <div  className="p-4 card bg-primary text-white">
            <h1 className="card-title" >Iniciar sesión</h1>
            <Formik initialValues={{email:"", password:""}} validationSchema={LoginSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className="container">
                        <div className="mb-3">
                            <label className="form-label">
                                Correo
                                <Field type="email" name="email" className="mt-3 form-control" id="email" placeholder="ejemplo@correo.com"/>
                            </label>
                        </div>
                        <div className="text-danger">
                            <ErrorMessage name="email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Contraseña
                                <Field type="password" name="password" className="mt-3 form-control" id="password" placeholder="Ingresa tu contraseña"/>
                            </label>
                        </div>
                        <div className="text-danger">
                            <ErrorMessage name="password" />
                        </div>
                        {statusMessage && <p className="text-light">{statusMessage}</p>}
                        <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;