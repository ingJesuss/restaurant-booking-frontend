"use client";
import React, { useState, useCallback } from "react";
import classNames from "classnames";

// MOCK DATA: Simulación de la lista de mesas del Backend
const mockTables = [
  {
    id: 1,
    name: "Mesa 1",
    capacity: 4,
    location: "Salón Principal",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Mesa 2",
    capacity: 2,
    location: "Terraza",
    isAvailable: false,
  },
  {
    id: 3,
    name: "Mesa 3",
    capacity: 8,
    location: "Salón VIP",
    isAvailable: true,
  },
  {
    id: 4,
    name: "Mesa 4",
    capacity: 4,
    location: "Salón Principal",
    isAvailable: true,
  },
];

/**
 * Componente de gestión de Mesas para el administrador. Permite ver y manipular las mesas.
 */
export default function TableList() {
  // Inicializa el estado con las mesas MOCK
  const [tables, setTables] = useState(mockTables);
  // Estado para controlar la apertura del modal (futura implementación de Añadir/Editar)
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Simulación de la función de eliminación.
   * Cuando se conecte el Backend, esta función hará una llamada DELETE a la API.
   */
  const handleDelete = useCallback((tableId) => {
    // MOCK: Filtra las mesas, simulando que la mesa ha sido eliminada.
    const confirmation = window.confirm(
      `¿Estás seguro de que deseas eliminar la Mesa con ID ${tableId}?`
    );
    if (confirmation) {
      setTables((prevTables) =>
        prevTables.filter((table) => table.id !== tableId)
      );
      // NOTA: Se usó window.confirm() como un mock rápido. En producción, se usaría un modal personalizado.
    }
  }, []);

  // Clases para el estado de disponibilidad
  const getAvailabilityClasses = (isAvailable) =>
    classNames(
      "px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full",
      {
        "bg-green-100 text-green-800": isAvailable,
        "bg-red-100 text-red-800": !isAvailable,
      }
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Gestión de Mesas
          </h1>
          {/* Botón MOCK para añadir nueva mesa (abrirá el modal en el futuro) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl shadow-lg transition duration-300 transform hover:scale-105"
          >
            + Añadir Nueva Mesa
          </button>
        </div>

        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "ID",
                  "Nombre",
                  "Capacidad",
                  "Ubicación",
                  "Disponible",
                  "Acciones",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tables.map((table) => (
                <tr
                  key={table.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {table.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {table.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {table.capacity} personas
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {table.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getAvailabilityClasses(table.isAvailable)}>
                      {table.isAvailable ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {/* Botón Editar MOCK */}
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-indigo-600 hover:text-indigo-800 mr-3 transition duration-150"
                    >
                      Editar
                    </button>
                    {/* Botón Eliminar MOCK */}
                    <button
                      onClick={() => handleDelete(table.id)}
                      className="text-red-600 hover:text-red-800 transition duration-150"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {tables.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No hay mesas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal de Edición/Añadir (futura implementación) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Modal de Edición (MOCK)</h2>
            <p>Aquí irá el formulario para editar o añadir una mesa.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
