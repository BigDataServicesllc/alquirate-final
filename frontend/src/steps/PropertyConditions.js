// Ruta: (ajústala según tu estructura, ej: src/steps/PropertyConditions.js)

import React from 'react';

const PropertyConditions = ({ formData, handleChange, handleRatingChange, errors }) => {
  const noiseLevelOptions = [
    { value: 'good', label: 'Buenas 👍' }, // Puedes usar emojis o iconos
    { value: 'regular', label: 'Regulares 😐' },
    { value: 'bad', label: 'Malas 👎' },
  ];

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">Sobre la Propiedad y Convivencia</h2>
      <div className="space-y-6">

        {/* Condiciones del Inmueble (P1) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Consideras que las condiciones generales del inmueble fueron satisfactorias?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[ { label: 'Sí', value: true }, { label: 'No', value: false } ].map(option => (
              <label key={`conditionsSatisfactory-${option.value}`} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="conditionsSatisfactory"
                  value={String(option.value)}
                  checked={formData.conditionsSatisfactory === option.value}
                  onChange={(e) => {
                    const val = e.target.value === 'true';
                    handleChange({ target: { name: 'conditionsSatisfactory', value: val, type: 'radio' } });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.conditionsSatisfactory && <p className="text-red-500 text-xs mt-1">{errors.conditionsSatisfactory}</p>}
        </div>

        {/* Respuesta del Dueño (P7) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿El dueño/administrador atendió las fallas o problemas de la propiedad en tiempo y forma?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[ { label: 'Sí', value: true }, { label: 'No', value: false } ].map(option => (
              <label key={`ownerResponsive-${option.value}`} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="ownerResponsive"
                  value={String(option.value)}
                  checked={formData.ownerResponsive === option.value}
                  onChange={(e) => {
                    const val = e.target.value === 'true';
                    handleChange({ target: { name: 'ownerResponsive', value: val, type: 'radio' } });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.ownerResponsive && <p className="text-red-500 text-xs mt-1">{errors.ownerResponsive}</p>}
        </div>

        {/* Nivel de Ruido (P10) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Cómo calificarías las condiciones de ruido en la propiedad?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {noiseLevelOptions.map(option => (
              <label key={option.value} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="noiseLevel"
                  value={option.value}
                  checked={formData.noiseLevel === option.value}
                  onChange={handleChange} // handleChange genérico funciona si value es el string
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.noiseLevel && <p className="text-red-500 text-xs mt-1">{errors.noiseLevel}</p>}
        </div>

        {/* Admisión de Mascotas (P9) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Se admiten mascotas en la propiedad?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[ { label: 'Sí', value: true }, { label: 'No', value: false }, {label: 'No lo sé', value: null} ].map(option => ( // Añadida opción "No lo sé"
              <label key={`petsAllowed-${String(option.value)}`} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="petsAllowed"
                  value={String(option.value)}
                  checked={formData.petsAllowed === option.value} // Compara directamente con el valor del estado
                  onChange={(e) => {
                    let val;
                    if (e.target.value === 'true') val = true;
                    else if (e.target.value === 'false') val = false;
                    else val = null; // Para "No lo sé"
                    handleChange({ target: { name: 'petsAllowed', value: val, type: 'radio' } });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.petsAllowed && <p className="text-red-500 text-xs mt-1">{errors.petsAllowed}</p>}
        </div>

        {/* Apto para Niños (P8) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">¿Consideras que el lugar es apto para niños?</label>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {[ { label: 'Sí', value: true }, { label: 'No', value: false }, {label: 'No aplica / No lo sé', value: null} ].map(option => ( // Añadida opción "No aplica / No lo sé"
              <label key={`childFriendly-${String(option.value)}`} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer border border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                <input
                  type="radio"
                  name="childFriendly"
                  value={String(option.value)}
                  checked={formData.childFriendly === option.value}
                  onChange={(e) => {
                    let val;
                    if (e.target.value === 'true') val = true;
                    else if (e.target.value === 'false') val = false;
                    else val = null; // Para "No aplica / No lo sé"
                    handleChange({ target: { name: 'childFriendly', value: val, type: 'radio' } });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {errors.childFriendly && <p className="text-red-500 text-xs mt-1">{errors.childFriendly}</p>}
        </div>

      </div>
    </div>
  );
};

export default PropertyConditions;