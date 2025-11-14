# Reservación GPOPZA - Frontend

Este proyecto es el frontend de la aplicación de reservación de mesas para el restaurante GPOPZA, desarrollado con Next.js.

## Objetivo

Permitir a los clientes reservar mesas en línea y facilitar la gestión de reservas y zonas para el personal del restaurante, todo desde una interfaz moderna y responsiva.

## Estructura del Proyecto

```
app/
  ├── globals.css         # Estilos globales
  ├── layout.js           # Layout principal
  ├── page.js             # Página principal
  ├── admin/
  │   └── dashboard/
  │       └── page.js     # Panel de administración
  └── login/
      └── page.js         # Página de login
public/                   # Archivos estáticos
src/
  ├── components/
  │   ├── Footer.jsx
  │   ├── Header.jsx
  │   ├── client/
  │   │   ├── BookingForm.jsx
  │   │   └── HeroSection.jsx
  │   ├── admin/
  │   │   └── TableList.jsx
  │   ├── auth/
  │   │   ├── AuthForm.jsx
  │   │   └── ProtectedRoute.jsx
  │   └── ui/
  │       └── LoadingSpinner.jsx
  ├── context/
  │   └── CurrentUserContext.js
  └── types/
      ├── routes.d.ts
      └── validator.ts
```

## ¿Cómo funciona?

- Los usuarios pueden reservar mesas, ver zonas disponibles y dejar comentarios o peticiones especiales.
- El área de administración permite gestionar mesas y reservas.
- El sistema utiliza componentes reutilizables y contexto para la gestión de usuario y estado global.

## Instalación y Ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Accede a [http://localhost:3000](http://localhost:3000) para usar la aplicación.

## Objetivos Específicos

- Mejorar la experiencia del cliente al reservar una mesa.
- Facilitar la gestión interna del restaurante.
- Permitir la administración de zonas, disponibilidad y reservas en tiempo real.
- Garantizar la seguridad y privacidad de los datos de los usuarios.

## Notas de Desarrollo

Actualmente, el proyecto utiliza datos MOCK (simulados) en varios componentes para facilitar las pruebas y el desarrollo de la interfaz, mientras se implementa la conexión con el backend real. Esto permite validar la experiencia de usuario y la lógica de la aplicación antes de integrar la API definitiva.

---

