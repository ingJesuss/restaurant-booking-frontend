'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { LayoutDashboard, Table2, LogOut, Key } from "lucide-react"; // Importamos los iconos necesarios

export default function Header() {
  const { isLoggedIn, handleSingOut } = useCurrentUser();
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-lg p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        {/* Logo y Título */}
        <Link
          href="/"
          className="flex items-center text-2xl font-extrabold text-indigo-700 tracking-wider hover:text-indigo-900 transition-colors"
        >
          <span className="text-3xl mr-2">🍽️</span> Reservación
        </Link>

        {/* Contenido Dinámico */}
        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* ESTADO LOGUEADO (ADMIN) - Navegación entre Mesas y Dashboard */}
              {pathname.includes("/admin/dashboard") ? (
                // Si estoy en Dashboard, muestro el botón para ir a Mesas
                <Link
                  href="/admin/tables"
                  className="flex items-center px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
                >
                  <Table2 className="w-5 h-5 mr-2" /> Mesas
                </Link>
              ) : (
                // Si estoy en Mesas, muestro el botón para ir a Dashboard
                <Link
                  href="/admin/dashboard"
                  className="flex items-center px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
                >
                  <LayoutDashboard className="w-5 h-5 mr-2" /> Dashboard
                </Link>
              )}

              <button
                onClick={handleSingOut}
                className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold shadow-md hover:bg-red-700 transition"
              >
                <LogOut className="w-5 h-5 mr-2" /> Salir
              </button>
            </>
          ) : (
            // ESTADO DESLOGUEADO (Opción para Login Admin)
            <Link
              href="/login"
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition shadow-lg"
            >
              <Key className="w-5 h-5 mr-2" /> Login Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}