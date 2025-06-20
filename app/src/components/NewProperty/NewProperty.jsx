import PropertyFormFields from "./PropertyFormFields";
import { usePropertyForm } from "./usePropertyForm";

const NewProperty = () => {
    // Usar el custom hook para toda la lógica del formulario
    const {
        form,
        errors,
        success,
        loading,
        handleChange,
        handleSubmit,
        resetForm,
    } = usePropertyForm();

    // Renderizado del formulario
    return (
        <form onSubmit={handleSubmit} noValidate>
            <PropertyFormFields
                form={form}
                errors={errors}
                handleChange={handleChange}
                loading={loading}
            />
            {success && <p className="alert alert-success">{success}</p>}
            {errors.submit && <p className="alert alert-danger">{errors.submit}</p>}
            <button type="submit" className="btn btn-primary me-2" disabled={loading}>
                {loading ? "Registrando..." : "Registrar"}
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
                disabled={loading}
            >
                Limpiar formulario
            </button>
        </form>
    );
};

export default NewProperty;
