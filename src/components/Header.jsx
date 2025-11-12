"use client";

import React from "react";
import Link from "next/link";
import { useCurrentUser } from "@/context/CurrentUserContext";

const Icon = ({ children, className }) => (
  <span className={className}>{children}</span>
);

export default function Header() {
  const { isLoggedIn, handleSingOut } = useCurrentUser();
  return (
        <header className="bg-white shadow-lg p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center max-w-7xl">
                
                {/* Logo y Título */}
                <Link href="/" className="flex items-center text-2xl font-extrabold text-indigo-700 tracking-wider hover:text-indigo-900 transition-colors">
                    <span className="text-3xl mr-2">🍽️</span> Reserva 
                </Link>

                {/* Contenido Dinámico */}
                <nav className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            {/* ESTADO LOGUEADO (ADMIN) */}
                            <Link 
                                href="/admin/dashboard" 
                                className="flex items-center px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
                            >
                                <Icon className="w-4 h-4 mr-1">📊</Icon> Dashboard
                            </Link>

                            <button 
                                onClick={handleSignOut}
                                className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold shadow-md hover:bg-red-700 transition"
                            >
                                <Icon className="w-4 h-4 mr-1">🚪</Icon> Salir
                            </button>
                        </>
                    ) : (
                        // ESTADO DESLOGUEADO (Opción para Login Admin)
                        <Link 
                            href="/login" 
                            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition shadow-lg"
                        >
                            <Icon className="w-4 h-4 mr-2">🔑</Icon> Login Admin
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}