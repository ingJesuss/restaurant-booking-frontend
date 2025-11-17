"use client";

import { useState } from "react";
import validator from "validator";
import classNames from "classnames";

//valores iniciales del formulario

const initialFormData = {
  date: "",
  time: "",
  people: 2,
  name: "",
  email: "",
  phone: "",
  comments: "",
};

export default function BookingForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  //validar datos, devuelve un objeto con los errores encontrados
  const validate = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.data) {
      newErrors.date = "La fecha es obligatoria";
      isValid = false;
    }
    if (!formData.time) {
      newErrors.time = "La hora es obligatoria";
      isValid = false;
    }
    if (!formData.people < 1) {
      newErrors.people = "El numero de comensales debe ser por lo menos 1";
      isValid = false;
    }
    if (!formData.name) {
      newErrors.name = "El nombre es obligatorio";
      isValid = false;
    }
    if (!validator.isEmail(formData.email)) {
      newErrors.email = "formato email invalido";
      isValid = false;
    }

    formData.comments = validator.escape(formData.comments);

    setErrors(newErrors);
    return isValid, newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "people" ? parseIn(value, 10) : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }
    setIsSubmitting(true);
    setStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Reserva enviada:", formData);
      setStatus("success");
      setFormData(initialFormData); // Limpia el formulario
    } catch (error) {
      // LÓGICA DE ERROR MOCK: (futura conexión a API)
      console.error("Error al hacer la reserva:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  //estilos pa input

  const inputClasses = (name) =>
    classNames(
      "w-full px-4 text-gray-700 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 transition duration-150 placeholder-black-200 placeholder:text-sm",
      {
        "border-red-500": errors[name],
        "border-gray-300": !errors[name],
      }
    );

  //fecha y hora

  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toLocaleTimeString("es-Es", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-3xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        ¡Reserva tu Mesa Ahora!
      </h2>
      <p className="text-gray-800 mb-8">
        Completa los datos de tu reservación. Confirmaremos la disponibilidad
        por correo electronico o un asesor se pondra en contacto contigo via
        telefónica.
      </p>
      {/* Mensajes de Estado */}
      {status === "success" && (
        <div
          className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-xl"
          role="alert"
        >
          ✅ ¡Reserva solicitada con éxito! Revisa tu correo electrónico para la
          confirmación.
        </div>
      )}
      {status === "error" && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-xl"
          role="alert"
        >
          ❌ Hubo un error al procesar tu solicitud. Por favor, revisa los
          campos.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols2 gap-6"
        id="booking-form-anchor"
      >
        <div className="md:col-span-2 border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold text-indigo-700">
            Fecha y Hora
          </h3>
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha de la Reservación
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
            className={inputClasses("date")}
          />
          {errors.date && (
            <p className="mt-1 text-xs text-red-500">{errors.date}</p>
          )}
        </div>
        {/* hora */}
        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Hora (Ej: 19:30)
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className={inputClasses("time")}
          />
          {errors.time && (
            <p className="mt-1 text-xs text-red-500">{errors.time}</p>
          )}
        </div>

        {/* comensales */}
        <div>
          <label
            htmlFor="people"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Número de Comensales
          </label>
          <input
            type="number"
            id="people"
            name="people"
            value={formData.people}
            onChange={handleChange}
            min="1"
            required
            className={inputClasses("people")}
          />
          {errors.people && (
            <p className="mt-1 text-xs text-red-500">{errors.people}</p>
          )}
        </div>
        <div className="md:col-span-2 border-b pb-4 mb-4 mt-4">
          <h3 className="text-xl font-semibold text-indigo-700">Información del Contacto</h3>
        </div>
        {/* nombre */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Jesus Hernandez"
            className={inputClasses("name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
          )}
        </div>
        {/* email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="reservacion@gmail.com"
            className={inputClasses("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        {/* telefono */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="2224897354"
            className={inputClasses("phone")}
          />
        </div>
        {/* 3. Comentarios */}
        <div className="md:col-span-2">
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comentarios o Peticiones Especiales
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
            placeholder="¿Tienes alguna petición especial, o comentario relevante para tu reservación? Escríbelo aquí."
            className={inputClasses("comments")}
          ></textarea>
        </div>
        {/* boton */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={classNames(
              "w-full flex justify-center items-center py-3 px-6 text-lg font-bold rounded-xl shadow-lg transition duration-300 transform",
              {
                "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.01]":
                  !isSubmitting,
                "bg-gray-400 text-gray-700 cursor-not-allowed": isSubmitting,
              }
            )}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando Reserva...
              </>
            ) : (
              "Confirmar Reserva"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
