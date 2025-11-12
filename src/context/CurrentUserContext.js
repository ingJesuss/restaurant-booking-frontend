'use client';
import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const CurrentUserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {},
    handleSingOut: () => {},
    isLoggedIn: false,
});

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();    
    const isLoggedIn = !!currentUser;

    const handleSignOut = useCallback(() => {
        localStorage.removeItem('jwt')
        setCurrentUser(null);
        router.push('/');
    },[router]);

    const contextValue = {
        currentUser,
        setCurrentUser,
        handleSignOut,
        isLoggedIn,
    };

    return (
        <CurrentUserContext.Provider value={contextValue}>
            {children}
        </CurrentUserContext.Provider>
    );
    
};

export const useCurrentUser = () => useContext(CurrentUserContext);