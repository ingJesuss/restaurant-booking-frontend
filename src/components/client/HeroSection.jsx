'use client';
import { Globe, Utensils, Zap, Clock, Shield } from "lucide-react";

export default function HeroSection() {
    const zones = [
        {name:"Comedor Principal", icon:<Utensils size={24} />, description:"Disfruta de nuestro comedor principal con ambiente acogedor y servicio excepcional."},
        {name:"Terraza", icon:<Globe size={24} /> , description:"Relájate en nuestra terraza al aire libre, perfecta para cenas bajo las estrellas."},
        {name:"Salón VIP", icon:<Zap size={24} />, description:"Experimenta el lujo en nuestro salón VIP, ideal para ocasiones especiales."},
        {name:"Reservaciones Rápidas", icon:<Clock size={24} />, description:"Haz tu reservación en minutos con nuestro sistema rápido y eficiente."},
        {name:"Seguridad y Comodidad", icon:<Shield size={24} />, description:"Disfruta de un ambiente seguro y cómodo para ti y tus acompañantes."},
    ]

    return (
        <section className="relative w-full bg-indigo-900 text-white min-h-[60vh] flex items-center justify-center overflow-hidden">
            
            {/* Fondo decorativo (simulando una imagen o patrón) */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ 
                backgroundImage: "url('https://scontent.fpbc1-1.fna.fbcdn.net/v/t39.30808-6/481980429_638487175608512_3391608242443369678_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=uUcVXJOlX9gQ7kNvwFZtYsh&_nc_oc=AdnQE3qjUwersUKZqWfTyKvtLik1eGdme9Pn2FP4N0mXD9n51o-uwQklSNLrgOm8-iMmKtJ_55S3aAo2zyBIszsZ&_nc_zt=23&_nc_ht=scontent.fpbc1-1.fna&_nc_gid=zxqastzWl3eFpOwgZUmCFQ&oh=00_AfineFhGNGfAFYiFW2r4nFZL28aFVqYYAq_OT5lqs7ccPg&oe=691C227F')" 
            }} aria-hidden="true"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
                
                {/* Título Principal */}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
                    Reserva una Experiencia Gastronómica
                </h1>
                
                {/* Subtítulo */}
                <p className="text-xl md:text-2xl font-light mb-10 text-indigo-200 max-w-3xl mx-auto">
                    Asegura tu lugar en las mejores zonas de nuestro restaurante. 
                    Simple, rápido y en tiempo real.
                </p>

                {/* CTA Botón (apunta al formulario abajo) */}
                <a 
                    href="#booking-form-anchor" 
                    className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-bold rounded-full shadow-xl text-indigo-900 bg-yellow-400 hover:bg-yellow-300 transition duration-300 transform hover:scale-105"
                >
                    <Zap className="w-5 h-5 mr-3" />
                    Hacer mi Reserva Ahora
                </a>

                {/* Zonas Destacadas */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-indigo-700/50">
                    {zones.map((zone, index) => (
                        <div key={index} className="flex flex-col items-center bg-indigo-800/50 p-4 rounded-xl shadow-lg transition duration-300 hover:bg-indigo-700/70">
                            <div className="text-yellow-400 mb-2">{zone.icon}</div>
                            <h4 className="text-sm md:text-base font-semibold text-center">{zone.name}</h4>
                            <p className="text-xs text-indigo-200 mt-1 hidden md:block">{zone.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
