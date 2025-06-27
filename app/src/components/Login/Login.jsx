import { Formik, Form, Field, ErrorMessage } from "formik";
import { initialState } from "./initialState";
import { LoginSchema } from "./validateLogin";
import { useLoginForm } from "./useLoginForm";

const Login = () => {
  const { statusMessage, isLoading, handleSubmit } = useLoginForm();

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-4 border rounded p-4">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <Formik 
          initialValues={initialState} 
          validationSchema={LoginSchema} 
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <Field 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  placeholder="ejemplo@correo.com"
                />
                <div className="text-danger">
                  <ErrorMessage name="email" />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <Field 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  placeholder="Ingresa tu contraseña"
                />
                <div className="text-danger">
                  <ErrorMessage name="password" />
                </div>
              </div>
              
              {statusMessage && (
                <div className={`alert ${statusMessage.includes('exitoso') ? 'alert-success' : 'alert-danger'}`}>
                  {statusMessage}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary w-100" 
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;