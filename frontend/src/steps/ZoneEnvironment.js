// Ruta: (ajústala según tu estructura, ej: src/steps/ZoneEnvironment.js)

import React from 'react';
// Asumiremos que tienes un componente RatingStars o que lo crearemos/adaptaremos.
// Por ahora, usaremos un placeholder simple o botones para la calificación de estrellas si no tienes el componente listo.

// Componente simple de estrellas (puedes reemplazarlo con tu RatingStars.js si lo tienes)
const SimpleStarRating = ({ rating, maxRating = 5, onRatingChange, name }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button" // Importante para que no haga submit del form
            className={`text-2xl ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
            onClick={() => onRatingChange(name, starValue)}
            aria-label={`Calificar ${starValue} de ${maxRating} estrellas`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};


const ZoneEnvironment = ({ formData, handleChange, handleRatingChange, errors }) => {
  const leisureOptionsList = [
    { value: 'school', label: 'Jardin de infantes / Colegios /Universidades '},
    { value: 'parks', label: 'Parques / Plazas' },
    { value: 'bars', label: 'Bares' },
    { value: 'restaurants', label: 'Restaurantes' },
    { value: 'nightclubs', label: 'Discotecas / Clubes nocturnos' },
    { value: 'cinemas', label: 'Cines' },
    { value: 'theaters', label: 'Teatros' },
    { value: 'shopping_malls', label: 'Centros Comerciales' },
    { value: 'gyms', label: 'Gimnasios' },
    { value: 'ecobici', label: 'Estación Ecobici '},
    { value: 'none', label: 'Ninguna de las anteriores / Muy pocas' },
    // Puedes añadir más opciones
  ];

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">Sobre la Zona y el Entorno</h2>
      <div className="space-y-6">

        {/* Seguridad de la Zona (P12) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            En una escala del 1 al 5, ¿qué tan segura consideras que es la zona?
            <span className="block text-xs text-gray-500">(Siendo 1 muy insegura y 5 muy segura)</span>
          </label>
          {/* Usa tu componente RatingStars.js aquí si lo tienes, o el SimpleStarRating */}
          <SimpleStarRating
            name="zoneSafety" // El nombre del campo en formData
            rating={formData.zoneSafety}
            maxRating={5}
            onRatingChange={handleRatingChange} // La función de AddReviewPage.js
          />
          {errors.zoneSafety && <p className="text-red-500 text-xs mt-1">{errors.zoneSafety}</p>}
        </div>

        {/* Medios de Transporte Cercanos (P11) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Hay medios de transporte público cercanos (colectivos, subte, tren, etc.)?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[ { label: 'Sí', value: true }, { label: 'No', value: false } ].map(option => (
              <label key={`publicTransportNearby-${option.value}`} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="publicTransportNearby"
                  value={String(option.value)}
                  checked={formData.publicTransportNearby === option.value}
                  onChange={(e) => {
                    const val = e.target.value === 'true';
                    handleChange({ target: { name: 'publicTransportNearby', value: val, type: 'radio' } });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.publicTransportNearby && <p className="text-red-500 text-xs mt-1">{errors.publicTransportNearby}</p>}
        </div>

        {/* Propuestas de Ocio (P13) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Qué tipo de propuestas de ocio y servicios hay cerca? (selecciona todas las que apliquen)</label>
          <div className="space-y-2">
            {leisureOptionsList.map(option => (
              <label key={option.value} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-transparent has-[:checked]:border-blue-200 has-[:checked]:bg-blue-50">
                <input
                  type="checkbox"
                  name="leisureOptions" // Mismo name para agrupar en el array
                  value={option.value}
                  checked={(formData.leisureOptions || []).includes(option.value)}
                  onChange={handleChange} // handleChange en AddReviewPage ya maneja esto
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.leisureOptions && <p className="text-red-500 text-xs mt-1">{errors.leisureOptions}</p>}
        </div>

      </div>
    </div>
  );
};

export default ZoneEnvironment;