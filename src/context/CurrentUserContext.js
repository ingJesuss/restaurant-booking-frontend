"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";

export const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  handleSingOut: () => {},
  isLoggedIn: false,
  isLoading: true,
});

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isLoggedIn = !!currentUser;

  const handleSingOut = useCallback(() => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    router.push("/");
  }, [router]);

  useEffect(() => {
    // En una app real, aquí se verifica el token JWT contra el Backend.

    // MOCK: Simulación de la verificación de sesión
    const checkAuth = async () => {
      // Simular la latencia de red/procesamiento
      await new Promise((resolve) => setTimeout(resolve, 500));

      const token = localStorage.getItem("jwt");

      if (token) {
        // Si hay token (simulando que es válido), establecemos un usuario mock
        setCurrentUser({
          _id: "mockAdminId",
          name: "Admin Mock",
          email: "admin@mock.com",
        });
      }

      // Una vez que la verificación (real o mock) termina, la carga es falsa
      setIsLoading(false);
    };

    checkAuth();
  }, []); // Se ejecuta solo al montar el componente

  const contextValue = {
    currentUser,
    setCurrentUser,
    handleSingOut,
    isLoggedIn,
    isLoading, // ⬅️ Exportado para ProtectedRoute
  };
  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserContext);
