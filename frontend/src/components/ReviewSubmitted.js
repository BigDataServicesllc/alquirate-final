import React from 'react';

const ReviewSubmitted = ({ rating, onRateAnother }) => {
  // Función para renderizar las estrellas según la calificación
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Estrella completa
        stars.push(
          <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      } else {
        // Estrella vacía
        stars.push(
          <svg key={i} className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      }
    }
    return stars;
  };
  
  // Mensaje según la calificación
  const getRatingMessage = (rating) => {
    if (rating >= 4) {
      return "¡Excelente! Esta propiedad parece ser una muy buena opción para alquilar.";
    } else if (rating >= 3) {
      return "Buena calificación. Esta propiedad cumple con la mayoría de los estándares esperados.";
    } else if (rating >= 2) {
      return "Calificación regular. Esta propiedad podría mejorar en varios aspectos.";
    } else {
      return "Calificación baja. Esta propiedad presenta problemas significativos según tu evaluación.";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">¡Gracias por tu calificación!</h2>
        <p className="text-gray-600 mb-6">
          Tu experiencia ayudará a otros inquilinos a tomar decisiones informadas.
          Basado en tus respuestas, hemos calculado la siguiente calificación para esta propiedad:
        </p>
        
        <div className="flex justify-center mb-4">
          {renderStars(rating)}
        </div>
        
        <p className="text-lg font-medium mb-8">
          {getRatingMessage(rating)}
        </p>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-left">
          <h3 className="text-blue-800 font-semibold mb-2">¿Qué sucede ahora?</h3>
          <ul className="text-blue-700 space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Tu calificación se ha publicado y ya es visible para otros usuarios.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Puedes editar tu calificación en cualquier momento desde tu perfil.</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Tu contribución ayuda a mejorar la transparencia en el mercado de alquileres.</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onRateAnother}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Calificar otra propiedad
          </button>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver todas mis calificaciones
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmitted;