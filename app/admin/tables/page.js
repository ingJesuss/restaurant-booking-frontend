'use client';
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TableList from '@/components/admin/TableList';

/**
 * Componente que define la página de gestión de mesas.
 * Mapea la URL: /admin/tables
 */
function AdminTablesContent() {
    return (
        // El TableList es el componente que contiene toda la interfaz de la tabla y la lógica mock
        <TableList />
    );
}

/**
 * Punto de Entrada Protegido: Envuelve el contenido en el guardián de autenticación.
 * Si el usuario no está logueado, es redirigido a /login.
 */
export default function AdminTablesPage() {
    return (
        <ProtectedRoute>
            <AdminTablesContent />
        </ProtectedRoute>
    );
}