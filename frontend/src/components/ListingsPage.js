import React from 'react';
import { properties } from '../mock/properties'; // Importar propiedades
import { formatPrice, formatRating } from '../utils/formatters'; // Importar formatters
import RatingStars from './RatingStars'; // Importar RatingStars

const ListingsPage = ({ setCurrentPage, onSelectProperty }) => {
  // Crear una copia explícita de las propiedades para asegurar que no se modifique el original
  const listings = Array.isArray(properties) ? [...properties] : []; 

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Propiedades en alquiler</h1>
      
      {listings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600">No hay propiedades disponibles por el momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map(property => (
            <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="relative h-48">
                <img 
                  src={property.imageUrl} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg font-semibold">
                  {formatPrice(property.price)}
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-500 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {property.location}
                </p>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    {/* Usar el componente RatingStars */}
                    <RatingStars rating={property.propertyRating} size="sm" showNumber={false} />
                    <span className="ml-1 font-semibold">{formatRating(property.propertyRating)}</span>
                    <span className="text-gray-500 ml-1">({property.reviews.length} reseñas)</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                      </svg>
                      {property.bedrooms}
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {property.bathrooms}
                    </span>
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                      </svg>
                      {property.area}m²
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    // Aquí llamaríamos a onSelectProperty si estuviera implementado
                    // onSelectProperty(property.id);
                    console.log('Ver detalles de propiedad:', property.id);
                    // Temporalmente volvemos al inicio
                    setCurrentPage('home'); 
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;

// DONE