'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/context/CurrentUserContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// envolveremos las rutas que requieres autenticación
export default function ProtectedRoute( { children }) {
    const {isLoggedIn, isLoading } = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            router.push('/login');
        }

    },[isLoading,isLoggedIn, router]);

 // Si todavía estamos comprobando el token (isLoading es true), mostramos el spinner.
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <LoadingSpinner size="h-12 w-12" />
                <p className="ml-4 text-gray-600">Verificando sesión...</p>
            </div>
        );
    }

    if (isLoggedIn) {
        return children
    }
    return null;
}
