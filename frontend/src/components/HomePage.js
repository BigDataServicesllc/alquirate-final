// src/components/HomePage.js
import React from 'react';
import { motion } from 'framer-motion';

// 1. Importaciones para el carrusel
import Slider from 'react-slick';
import TestimonialCard from './TestimonialCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from '../contexts/AuthContext'; // Importamos nuestro hook useAuth

import { useNavigate } from 'react-router-dom'; // 1. Importa useNavigate

// 2. Datos para los testimonios
const testimonialsData = [
  {
    name: 'Laura Fernández',
    location: 'Buenos Aires',
    comment: 'Gracias a AlquiRate evité alquilar una propiedad con problemas de humedad y logré conseguir un sitio mejor.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop',
  },
  {
    name: 'Martín Rodríguez',
    location: 'Córdoba',
    comment: 'Como estudiante con poco presupuesto, agradezco los comentarios de otros usuarios. Logré conseguir una propiedad que se ajusta a mis necesidades.',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2670&auto=format&fit=crop',
  },
  {
    name: 'Sofía Gomez',
    location: 'Rosario',
    comment: 'La función de rankings por precio es increíble. Me ahorró horas de búsqueda y pude comparar barrios rápidamente.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop',
  }
];

const HomePage = ({ setCurrentPage, setShowLoginModal }) => { 
  
  const { currentUser: user, setRedirectPage } = useAuth();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, // Para pantallas de tablet para abajo
        settings: {
          slidesToShow: 1, // Mostrar solo 1 testimonio
        }
      }
    ]
  };

const handleCalificarClick = () => {
  if (user) {
    console.log("HomePage: Usuario ya logueado. Navegando a addReview.");
    setCurrentPage('addReview');
  } else {
    console.log("%cPASO 1 (HomePage): Guardando redirectPage como 'addReview'", "color: green; font-weight: bold;");
    setRedirectPage('addReview'); 
    setShowLoginModal(true); 
  }
};

  return (
    <div>
      {/* --- SECCIÓN HERO (Tu código original) --- */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tu aliado al alquilar
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Calificá propiedades, consultá precios y decidí con datos reales.
          </p>
          <button 
            onClick={handleCalificarClick} // 6. Asignamos nuestra función al evento onClick
            className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Calificar una propiedad
          </button>
        </motion.div>
      </section>

      {/* --- SECCIÓN "CÓMO FUNCIONA" (Tu código original) --- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona AlquiRate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                title: "Calificá tu propiedad",
                description:
                  "Contanos cómo fue tu experiencia como inquilino. Valorá al propietario, al inmueble y ayudá a otros a tomar mejores decisiones.",
              },
              {
                iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                title: "Consultá el ranking por zona",
                description:
                  "Mirá qué barrios tienen los mejores precios y calificaciones. Accedé a información real, basada en experiencias reales.",
              },
              {
                iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Decidí informado",
                description:
                  "Usá AlquiRate como guía. Leé comentarios, compará zonas y elegí tu próximo alquiler con confianza.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md text-center transition-transform hover:scale-[1.03] duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={card.iconPath}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN DE TESTIMONIOS (Reemplazada por el Carrusel) --- */}
      <section className="pt-16 pb-24 px-4 bg-white testimonial-slider">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros usuarios</h2>
          
          <Slider {...sliderSettings}>
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="px-2 md:px-4 h-full"> {/* h-full aquí para ayudar a flexbox */}
                <TestimonialCard 
                  name={testimonial.name}
                  location={testimonial.location}
                  comment={testimonial.comment}
                  imageUrl={testimonial.imageUrl}
                />
              </div>
            ))}
          </Slider>

        </div>
      </section>
      {/* --- SECCIÓN FINAL CTA (Tu código original) --- */}
      {/* --- SECCIÓN FINAL CTA (Versión 3, Visual y con Social Proof) --- */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-12">
                Decisiones informadas, alquileres más justos
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
              {/* Tarjeta 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="text-4xl mb-4">❓</div>
                <h3 className="text-xl font-semibold mb-2">¿Dudas sobre un barrio?</h3>
                <p className="text-gray-600">
                  Consulta precios, seguridad y experiencias reales de otros inquilinos.
                </p>
              </motion.div>

              {/* Tarjeta 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-semibold mb-2">Aporta tu granito de arena</h3>
                <p className="text-gray-600">
                  Tu calificación es anónima y ayuda a toda la comunidad a tomar mejores decisiones.
                </p>
              </motion.div>

              {/* Tarjeta 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="text-5xl font-bold text-blue-600 mb-2">2800+</div>
                <h3 className="text-xl font-semibold mb-2">Localidades cubiertas</h3>
                <p className="text-gray-600">
                  Y creciendo cada día gracias a la colaboración de usuarios como tú.
                </p>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <button 
                onClick={handleCalificarClick} // Asignamos nuestra función al evento onClick
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Calificar mi última propiedad
              </button>
              <p className="mt-6 text-gray-500 text-sm">
                ¿Preguntas o sugerencias? <a href="mailto:contacto@alquirate.com" className="text-blue-600 hover:underline">Escríbenos a contacto@alquirate.com</a>
              </p>
            </motion.div>

          </div>
        </section>
    </div>
  );
};

export default HomePage;