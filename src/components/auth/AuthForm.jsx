"use client";
import { useState, useEffect } from "react";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useRouter } from "next/navigation";
import validator from "validator";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isLoggedIn, setCurrentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // Asumiendo que /admin/dashboard es la página de destino
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [isLoggedIn, router]);


//funcion de validación
  const validate = () => {
    if (!validator.isEmail(email)){
        setError('Por favor ingrese un correo válido.');
        return false;
    }
    if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        if (!isLogin && name.length < 3) {
            setError('El nombre debe tener al menos 3 caracteres para el registro.');
            return false;
        }
        setError(null); // Limpiar errores si la validación es exitosa
        return true;
    };
    // 4. Función de Manejo de Envío (Actualmente con MOCK data)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;        
        setIsLoading(true);
        setError(null);

        // Lógica de MOCK (simulación de la llamada al Backend)
        try {
            // En una app real, usarías: fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${isLogin ? 'login' : 'register'}`, { ... })
            
            // Simulación de espera de la red
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            if (isLogin) {
                 // Simulación de respuesta exitosa de Login
                 const mockUser = { _id: 'admin123', email, name: 'Admin Name' };
                 localStorage.setItem('jwt', 'mock_jwt_token'); 
                 setCurrentUser(mockUser);
            } else {
                // Simulación de respuesta exitosa de Registro
                // Una vez registrado, generalmente se redirige al login
                alert('Registro exitoso. ¡Ahora inicia sesión!'); 
                setIsLogin(true);
            }

        } catch (err) {
            // Simulación de error
            setError(isLogin ? 'Fallo el inicio de sesión. Credenciales incorrectas.' : 'Fallo el registro. El email ya está en uso.');
        } finally {
            setIsLoading(false);
        }        
    };
     

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl border border-gray-700">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                {isLogin ? 'Acceso de Administrador' : 'Registro de Administrador'}
            </h1>
            
            {/* Mensaje de Error */}
            {error && (
                <div className="p-3 mb-4 text-sm text-orange-600 font-bold bg-gray-200 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Campo de Nombre (Solo en Registro) */}
                {!isLogin && (
                    <input
                        type="text"
                        placeholder ="Nombre Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={!isLogin}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 placeholder:text-gray-400 text-gray-800"
                        disabled={isLoading}
                    />
                )}
                
                {/* Campo de Email */}
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 placeholder:text-gray-400 text-gray-800"
                    disabled={isLoading}
                />
                
                {/* Campo de Contraseña */}
                <input
                    type="password"
                    placeholder="Contraseña (mín. 6 caracteres)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 placeholder:text-gray-400 text-gray-800"
                    disabled={isLoading}
                />
                
                {/* Botón de Envío */}
                <button
                    type="submit"
                    className="w-full p-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:bg-indigo-400 flex items-center justify-center"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner size="h-5 w-5" />
                            <span className="ml-3">Cargando...</span>
                        </>
                    ) : (
                        isLogin ? 'Iniciar Sesión' : 'Registrarse'
                    )}
                </button>
            </form>

            {/* Alternador de Vistas */}
            <p className="mt-6 text-center text-sm text-gray-600">
                {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                <button 
                    type="button"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setError(null); // Limpiamos errores al cambiar
                        setName(''); setEmail(''); setPassword(''); // Limpiar campos
                    }}
                    className="ml-2 font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    disabled={isLoading}
                >
                    {isLogin ? 'Regístrate' : 'Iniciar Sesión'}
                </button>
            </p>
        </div>
    );





}
