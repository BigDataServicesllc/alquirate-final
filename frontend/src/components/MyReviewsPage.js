// Ruta: (ajústala según tu estructura, ej: src/components/MyReviewsPage.js)
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../utils/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify'; // <--- ¡AQUÍ ESTÁ LA LÍNEA AÑADIDA!
//import { Link } from 'react-router-dom'; // Comentado porque no lo estamos usando

// Un componente simple para mostrar cada review
const ReviewCard = ({ review }) => {
  const formatDate = (timestamp) => {
    if (!timestamp || typeof timestamp.seconds !== 'number') { // Chequeo más robusto
        return 'Fecha no disponible';
    }
    try {
      return new Date(timestamp.seconds * 1000).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (error) {
      console.warn("Error formateando fecha:", timestamp, error);
      return "Fecha inválida";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-blue-600 break-all">
          {review.propertyFullAddress || review.propertyCity || 'Dirección no especificada'}
        </h3>
        {/* Mostrar estado de aprobación si el campo existe */}
        {typeof review.isApproved === 'boolean' && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              review.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {review.isApproved ? 'Aprobada' : 'Pendiente'}
            </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-3">Calificación del: {formatDate(review.createdAt)}</p>
      
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700">Tu recomendación (1-10): 
          <span className="text-lg font-bold text-blue-500 ml-1">{review.npsScore || 'N/A'} ★</span>
        </p>
      </div>

      {review.publicComment && (
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-1">Tu comentario:</p>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-md text-sm italic">"{review.publicComment}"</p>
        </div>
      )}
      
      {/* Podrías añadir un botón/enlace para ver más detalles de la review si fuera necesario */}
      {/* <button className="text-sm text-blue-500 hover:underline mt-2">Ver detalles completos</button> */}
    </div>
  );
};


const MyReviewsPage = ({ setCurrentPage }) => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      // Opcional: Redirigir o mostrar mensaje si no hay usuario.
      // Esta condición ya se maneja en el return de abajo.
      return;
    }

    const fetchUserReviews = async () => {
      setLoading(true);
      setError(null); // Limpiar errores previos
      try {
        const reviewsRef = collection(db, 'reviews');
        const q = query(
          reviewsRef,
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const userReviews = [];
        querySnapshot.forEach((doc) => {
          userReviews.push({ id: doc.id, ...doc.data() });
        });
        setReviews(userReviews);
      } catch (err) {
        console.error("Error fetching user reviews: ", err);
        // Comprobar si el error es por índice faltante
        if (err.code === 'failed-precondition' && err.message.includes('index')) {
            const firebaseConsoleLink = err.message.substring(err.message.indexOf('https://'));
            setError(
              <>
                Esta consulta requiere un índice en Firebase. Por favor, crea el índice haciendo clic en el siguiente enlace (puede tardar unos minutos en activarse): 
                <a href={firebaseConsoleLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  Crear Índice
                </a>
              </>
            );
            toast.error('Error de configuración: Se requiere un índice en Firebase. Revisa la consola para más detalles.');
        } else {
            setError('Hubo un error al cargar tus calificaciones. Inténtalo de nuevo más tarde.');
            toast.error('Error al cargar tus calificaciones.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserReviews();
  }, [currentUser]); // Dependencia: currentUser

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">Cargando tus calificaciones...</p>
      </div>
    );
  }

  // Mostrar error de forma más prominente si existe
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">¡Error!</strong>
          <span className="block sm:inline ml-2">{typeof error === 'string' ? error : 'Ocurrió un problema.'}</span>
          {/* Si el error es un elemento JSX (como el mensaje del índice), se renderizará aquí */}
          {typeof error !== 'string' && <div>{error}</div>}
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-700 mb-4">Debes iniciar sesión para ver tus calificaciones.</p>
        <button
          onClick={() => setCurrentPage('login')}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Mis Calificaciones
          </h1>
          <button
            onClick={() => setCurrentPage('addReview')}
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            + Añadir Nueva Calificación
          </button>
        </div>

        {reviews.length === 0 && !loading && ( // Asegurarse que no esté cargando para mostrar este mensaje
          <div className="text-center bg-white p-8 rounded-xl shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Aún no tienes calificaciones</h3>
            <p className="mt-1 text-sm text-gray-500">
              ¡Anímate a compartir tu experiencia y ayuda a otros inquilinos!
            </p>
            <div className="mt-6">
              <button
                onClick={() => setCurrentPage('addReview')}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Calificar una Propiedad
              </button>
            </div>
          </div>
        )}

        {reviews.length > 0 && (
          <div>
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviewsPage;