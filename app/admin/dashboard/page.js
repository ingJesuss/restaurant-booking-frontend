'use client';
import React, { useMemo } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useCurrentUser } from '@/context/CurrentUserContext';

// Simulación de datos que vendrán del Backend (MOCK DATA)
const mockBookings = [
    { id: 'R001', clientName: 'Juan Pérez', date: '2025-11-15', time: '19:00', guests: 4, status: 'Confirmed' },
    { id: 'R002', clientName: 'María López', date: '2025-11-15', time: '20:30', guests: 2, status: 'Pending' },
    { id: 'R003', clientName: 'Carlos Ruiz', date: '2025-11-16', time: '18:45', guests: 6, status: 'Cancelled' },
    { id: 'R004', clientName: 'Ana Gómez', date: '2025-11-16', time: '21:00', guests: 3, status: 'Confirmed' },
];

/**
 * Muestra la tabla de las próximas reservas para el administrador.
 */
function BookingTable({ bookings }) {
    const getStatusClasses = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="overflow-x-auto shadow-xl rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {['ID', 'Cliente', 'Fecha', 'Hora', 'Personas', 'Estado', 'Acciones'].map((header) => (
                            <th key={header} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.clientName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{booking.guests}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                    Ver Detalle
                                </button>
                                {/* Botones de acción MOCK: Se implementarán al conectar el Backend */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


/**
 * El componente principal de la página de Dashboard.
 * Es la vista principal del Administrador.
 */
function DashboardContent() {
    const { currentUser } = useCurrentUser();
    const username = currentUser?.email || 'Administrador';

    // Usamos useMemo para simular la obtención de datos una sola vez
    const bookings = useMemo(() => mockBookings, []);
    const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
    const pendingCount = bookings.filter(b => b.status === 'Pending').length;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                    Panel de Administración
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Bienvenido, {username}. Aquí está el resumen de las reservas.
                </p>

                {/* Tarjetas de Resumen (Stats) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <DashboardCard title="Reservas Confirmadas" value={confirmedCount} color="bg-green-600" />
                    <DashboardCard title="Reservas Pendientes" value={pendingCount} color="bg-yellow-600" />
                    <DashboardCard title="Mesas Disponibles" value={15} color="bg-indigo-600" />
                </div>
                
                {/* Lista de Reservas */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">Próximas Reservas</h2>
                {bookings.length > 0 ? (
                    <BookingTable bookings={bookings} />
                ) : (
                    <div className="text-center py-10 bg-white rounded-xl shadow">
                        <p className="text-gray-500 text-lg">No hay reservas próximas.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Componente helper para las tarjetas de resumen
function DashboardCard({ title, value, color }) {
    return (
        <div className={`p-6 rounded-xl shadow-lg transform hover:scale-[1.01] transition duration-300 ${color} text-white`}>
            <p className="text-sm font-light uppercase opacity-90">{title}</p>
            <p className="text-5xl font-bold mt-2">{value}</p>
        </div>
    );
}

// 🔑 Punto de Entrada Protegido: Envuelve el contenido.
export default function AdminDashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}