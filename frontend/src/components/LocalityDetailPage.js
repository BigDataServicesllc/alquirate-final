// src/components/LocalityDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../utils/firebase';
import { doc, getDoc, collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';

// ✅ PASO 1: Definimos los componentes y funciones auxiliares FUERA y ANTES.

const InfoCard = ({ icon, title, children }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full">
    <div className="flex items-center mb-4">
      <span className="text-2xl mr-3">{icon}</span>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    </div>
    <div className="flex-grow">{children}</div>
  </div>
);

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = totalStars - fullStars;
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`} className="text-yellow-400 text-3xl">★</span>)}
      {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-gray-300 text-3xl">★</span>)}
    </div>
  );
};

const getSafetyDescription = (rating) => {
  if (rating >= 4.5) return 'Excelente';
  if (rating >= 4.0) return 'Muy Bueno';
  if (rating >= 3.0) return 'Bueno';
  if (rating >= 2.0) return 'Regular';
  if (rating > 0) return 'Malo';
  return 'Sin datos';
};


// ✅ PASO 2: El componente principal, ahora limpio.
const LocalityDetailPage = ({ localityId, onBack }) => { // <--- Asegúrate que onBack viene de App.js
  const [localityData, setLocalityData] = useState(null);
  const [recentReviews, setRecentReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!localityId) return;

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const rankingDocRef = doc(db, 'localityRankings', localityId);
        const reviewsQuery = query(
          collection(db, 'reviewsId'),
          where('localityId', '==', localityId),
          where('isApproved', '==', true),
          orderBy('createdAt', 'desc'), // Necesitarás un índice para esto
          limit(3)
        );

        const [rankingDocSnap, reviewsSnap] = await Promise.all([
          getDoc(rankingDocRef),
          getDocs(reviewsQuery)
        ]);

        if (rankingDocSnap.exists()) {
          setLocalityData(rankingDocSnap.data());
        } else {
          throw new Error("No se encontraron datos de ranking para esta localidad.");
        }
        
        const reviews = reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentReviews(reviews);

      } catch (err) {
        console.error("Error fetching locality details:", err);
        // Si el error es por un índice faltante, la consola del navegador te dará un enlace para crearlo.
        setError("Ocurrió un error al cargar los datos de la localidad.");
      }
      setLoading(false);
    };

    fetchAllData();
  }, [localityId]);

  // ✅ PASO 3: El renderizado condicional es CRÍTICO para evitar el error de 'null'.
  if (loading) {
    return <div className="text-center py-20">Cargando detalles del barrio...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }
  
  // Esta comprobación evita el 'Cannot read properties of null'
  if (!localityData) {
    return <div className="text-center py-20">No hay datos disponibles para esta localidad.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {onBack && (
        <button onClick={onBack} className="mb-8 text-blue-600 hover:underline">
          ← Volver a los Rankings
        </button>
      )}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{localityData.localityName}</h1>
      <p className="text-xl text-gray-500 mb-10">{localityData.partyName}, {localityData.provinceName}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <InfoCard icon="💲" title="Precios de Alquiler">
            <p className="text-3xl font-bold text-gray-900">{localityData.averagePriceArs ? `$${Math.round(localityData.averagePriceArs).toLocaleString('es-AR')}` : 'N/A'}</p>
            <p className="text-gray-500 mb-4">Precio promedio (ARS)</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Mín:</strong> {localityData.minPriceArs ? `$${localityData.minPriceArs.toLocaleString('es-AR')}` : 'N/A'}</p>
              <p><strong>Máx:</strong> {localityData.maxPriceArs ? `$${localityData.maxPriceArs.toLocaleString('es-AR')}` : 'N/A'}</p>
            </div>
            <p className="text-xs text-gray-400 mt-auto pt-4">Basado en {localityData.priceReviewCount} calificaciones.</p>
          </InfoCard>

          <InfoCard icon="🛡️" title="Nivel de Seguridad">
             {localityData.averageSafety ? (
               <>
                <StarRating rating={localityData.averageSafety} />
                <p className="text-lg font-semibold text-gray-800 mt-2">{localityData.averageSafety.toFixed(1)} / 5.0</p>
                <p className="text-gray-500">{getSafetyDescription(localityData.averageSafety)}</p>
                <p className="text-xs text-gray-400 mt-auto pt-4">Basado en {localityData.safetyReviewCount} calificaciones.</p>
               </>
             ) : ( <p className="text-gray-500">No hay datos de seguridad.</p> )}
          </InfoCard>
        </div>

        <div className="lg:col-span-2">
          <InfoCard icon="💬" title="Comentarios Recientes">
            {recentReviews.length > 0 ? (
              <div className="space-y-6">
                {recentReviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <p className="text-gray-700 italic">"{review.publicComment}"</p>
                    <p className="text-right text-xs text-gray-400 mt-2">- Anónimo, {review.createdAt?.seconds ? new Date(review.createdAt.seconds * 1000).getFullYear() : ''}</p>
                  </div>
                ))}
              </div>
            ) : ( <p className="text-gray-500">No hay comentarios para esta zona.</p> )}
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default LocalityDetailPage;