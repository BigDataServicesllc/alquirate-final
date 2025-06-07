// src/components/TestimonialCard.js
import React from 'react';

const TestimonialCard = ({ name, location, comment, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col items-center text-center">
      <img 
        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-gray-200"
        src={imageUrl} 
        alt={`Foto de ${name}`} 
      />
      <h4 className="font-bold text-gray-800">{name}</h4>
      <p className="text-sm text-gray-500 mb-4">{location}</p>
      <p className="text-gray-600 italic">"{comment}"</p>
    </div>
  );
};

export default TestimonialCard;