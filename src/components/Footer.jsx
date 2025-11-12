import React from "react";
import Link from "next/link";

export default function Footer() {
    return ( 
        <footer className="bg-gray-100 p-6 border-t border-gray-200 mt-12">
            <div className="container mx-auto text-center text-gray-600 text-sm max-w-7xl">
                <p> &copy; {new Date().getFullYear()} Reserva Pro. Profesionalismo en cada línea.  </p>
                <div>
                    <Link href='/' className="hover:text-indigo-600 transitions colors"> Acerca de</Link>
                    <Link href='/' className="hover:text-indigo-600 transitions colors"> Politica </Link>
                </div>
            </div>
        </footer>
    );
}
