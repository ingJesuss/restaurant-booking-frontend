import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CurrentUserProvider } from "@/context/CurrentUserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Reserva tu Mesa",
  description:
    "Reserva tu mesa en los mejores restaurantes de Grupo Plaza en Ciudad de Puebla: Nonamore (restaurante top y exclusivo), Mi Viejo Pueblito (restaurante tradicional), Cantina Mirador (restaurante bar familiar). Sistema moderno y seguro para gestionar tus reservaciones online.",
  keywords:
    "reservación, restaurante, Grupo Plaza, Nonamore, Mi Viejo Pueblito, Cantina Mirador, Puebla, bar familiar, restaurante exclusivo, comida mexicana, booking, mesa, reservaciones online",
  author: "Jeúsus Hernández López",
  openGraph: {
    title: "Reserva tu mesa",
    description:
      "Reserva tu mesa en los mejores restaurantes de Grupo Plaza en Ciudad de Puebla: Nonamore, Mi Viejo Pueblito, Cantina Mirador.",
    url: "https://tusitio.com",
    type: "website",
    images: [
      {
        url: "https://tusitio.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reservación Grupo Plaza Puebla",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CurrentUserProvider>
          <Header />
          {children}

          <Footer />
        </CurrentUserProvider>
      </body>
    </html>
  );
}
