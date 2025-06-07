// src/components/TipsSection.js
import React from 'react';

const TipItem = ({ children }) => (
  <li className="flex items-start">
    <svg className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span className="text-gray-700">{children}</span>
  </li>
);

const TipsSection = () => {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Consejos para interpretar los precios</h3>
      <ul className="space-y-3">
        <TipItem>
          Compara siempre el precio con la calificación de la propiedad y del propietario. Un precio bajo podría no ser una buena oferta si la experiencia es mala.
        </TipItem>
        <TipItem>
          Ten en cuenta que los precios pueden variar según el tamaño, antigüedad y estado de la propiedad dentro del mismo barrio.
        </TipItem>
        <TipItem>
          Las tendencias de precios pueden ayudarte a negociar mejor o a decidir el momento adecuado para mudarte.
        </TipItem>
        <TipItem>
          Si un precio está muy por debajo del promedio, investiga más a fondo antes de tomar una decisión. Podría haber razones ocultas.
        </TipItem>
      </ul>
    </div>
  );
};

export default TipsSection;