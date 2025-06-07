import React from 'react';
import { properties } from '../mock/properties';
import { formatPrice, formatRating } from '../utils/formatters';
import RatingStars from './RatingStars';

const FavoritesPage = ({ setCurrentPage }) => {
  // Simular propiedades favoritas (en una app real vendrían del usuario logueado)
  const favoritePropertyIds = [1, 3, 5]; 
  const favoriteProperties = properties.filter(property => favoritePropertyIds.includes(property.id));

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Favoritos</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          {favoriteProperties.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <h3 className="text-xl font-semibold mb-2">Aún no tienes propiedades favoritas</h3>
              <p className="text-gray-600 mb-6">
                Explora las propiedades y marca las que te gusten para guardarlas aquí.
              </p>
              <button
                onClick={() => setCurrentPage('listings')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explorar propiedades
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {favoriteProperties.map(property => (
                <div key={property.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-start">
                      <img 
                        src={property.imageUrl} 
                        alt={property.title} 
                        className="w-24 h-24 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{property.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{property.address}</p>
                        <div className="flex items-center">
                          <RatingStars rating={property.propertyRating} size="sm" />
                          <span className="ml-2 text-sm text-gray-500">({property.reviews.length} reseñas)</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                         <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                       </svg>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-blue-600">{formatPrice(property.price)}</span>
                    <div className="flex space-x-4 text-gray-600 text-sm">
                       <span className="flex items-center">
                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                         </svg>
                         {property.bedrooms}
                       </span>
                       <span className="flex items-center">
                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                         </svg>
                         {property.bathrooms}
                       </span>
                       <span className="flex items-center">
                         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                         </svg>
                         {property.area}m²
                       </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setCurrentPage('propertyDetail');
                      // Aquí podrías pasar el ID de la propiedad seleccionada
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;