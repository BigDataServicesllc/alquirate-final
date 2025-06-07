import React from 'react';

const RatingStars = ({ rating, size = 'md', showNumber = true }) => {
  // Asegurarse de que rating sea un número válido
  const numericRating = typeof rating === 'number' ? rating : parseFloat(rating);
  const validRating = isNaN(numericRating) ? 0 : Math.max(0, Math.min(5, numericRating)); // Limitar entre 0 y 5

  // Determinar el tamaño de las estrellas
  const getStarSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-10 h-10';
      case 'md':
      default:
        return 'w-5 h-5';
    }
  };
  
  // Función para renderizar las estrellas según la calificación
  const renderStars = () => {
    const stars = [];
    const starSize = getStarSize();
    
    // Calcular estrellas completas y parciales
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        // Estrella completa
        stars.push(
          <svg key={i} className={`${starSize} text-yellow-400`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Media estrella
        stars.push(
          <div key={i} className="relative">
            <svg className={`${starSize} text-gray-300`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <svg className={`${starSize} text-yellow-400`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </div>
        );
      } else {
        // Estrella vacía
        stars.push(
          <svg key={i} className={`${starSize} text-gray-300`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        );
      }
    }
    
    return stars;
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        {renderStars()}
      </div>
      {showNumber && (
        <span className={`ml-2 font-medium ${size === 'sm' ? 'text-sm' : size === 'lg' || size === 'xl' ? 'text-lg' : 'text-base'}`}>
          {validRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;