//autentificacion de usuarios
import AuthForm from "@/components/auth/AuthForm";

// EXPLICACIÓN: Este es el componente de la página para la ruta /login.
// Su única responsabilidad es renderizar el formulario de autenticación
// en el contexto del layout global.


export default function LoginPage() {
    return(
        <div className="py-12 min-h-screen bg-gray-50">
            <AuthForm />
        </div>
    );
}