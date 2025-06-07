// Ruta: (ajústala según tu estructura, ej: src/steps/FinalReview.js)

import React from 'react';

// Reutilizamos el componente SimpleStarRating del Step3 o usa tu propio componente RatingStars.js
const SimpleStarRating = ({ rating, maxRating = 10, onRatingChange, name }) => { // maxRating por defecto a 10
  return (
    <div className="flex flex-wrap gap-x-1 gap-y-1"> {/* flex-wrap y gap para mejor visualización en móviles */}
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            className={`text-2xl sm:text-3xl ${starValue <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
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

const FinalReview = ({ formData, handleChange, handleRatingChange, errors }) => {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">Tu Opinión Final y Comentario</h2>
      <div className="space-y-6">

        {/* Recomendación NPS (P15) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            En una escala del 1 al 10, ¿qué tan probable es que recomiendes esta propiedad a un familiar o conocido para alquilar?
            <span className="block text-xs text-gray-500">(Siendo 1 poco probable y 10 muy probable)</span>
          </label>
          <SimpleStarRating
            name="npsScore"
            rating={formData.npsScore}
            maxRating={10} // Asegúrate que el componente de estrellas maneje esto
            onRatingChange={handleRatingChange}
          />
          {errors.npsScore && <p className="text-red-500 text-xs mt-1">{errors.npsScore}</p>}
        </div>

        {/* ¿Recomendarías el lugar? (P14) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">En general, ¿recomendarías este lugar como un buen lugar para vivir?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[ { label: 'Sí, definitivamente', value: true }, { label: 'No, realmente no', value: false } ].map(option => (
              <label key={`wouldRecommendPlace-${option.value}`} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="wouldRecommendPlace"
                  value={String(option.value)}
                  checked={formData.wouldRecommendPlace === option.value}
                  onChange={(e) => {
                    const val = e.target.value === 'true';
                    handleChange({ target: { name: 'wouldRecommendPlace', value: val, type: 'radio' } });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.wouldRecommendPlace && <p className="text-red-500 text-xs mt-1">{errors.wouldRecommendPlace}</p>}
        </div>

        {/* Comentario Libre (P16) */}
        <div>
          <label htmlFor="publicComment" className="block text-sm font-medium text-gray-700 mb-1">
            Tu comentario (este podría aparecer en nuestra página de inicio)
            <span className="block text-xs text-gray-500">Sé específico y ayuda a otros inquilinos. ¿Qué destacarías positiva o negativamente?</span>
          </label>
          <textarea
            id="publicComment"
            name="publicComment"
            rows={5}
            value={formData.publicComment}
            onChange={handleChange}
            placeholder="Ej: La zona es tranquila y bien conectada, pero el propietario tardaba en responder a las reparaciones..."
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.publicComment ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.publicComment && <p className="text-red-500 text-xs mt-1">{errors.publicComment}</p>}
        </div>

      </div>
    </div>
  );
};

export default FinalReview;