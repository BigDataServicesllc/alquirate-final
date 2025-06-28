// src/App.js
import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
// Componentes y Páginas
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import HomePage from './components/HomePage';
import RankingsPage from './components/RankingsPage';
import LocalityDetailPage from './components/LocalityDetailPage';
import LoginModal from './components/LoginModal';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/RegisterPage';
import PleaseVerifyEmailPage from './components/PleaseVerifyEmailPage';
import TermsAndConditionsPage from './Pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage';
import AddReviewPage from './components/AddReviewPage';
import MyReviewsPage from './components/MyReviewsPage';

// Firebase y Toastify
import { auth, createUserProfileDocument, sendEmailVerification, createUserWithEmailAndPassword } from './utils/firebase'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Función actualizada para manejar todas las rutas, incluyendo la de detalle
const getInitialStateFromPath = () => {
  const path = window.location.pathname;
  if (path.startsWith('/localidad/')) {
    const localityId = path.split('/')[2];
    return { page: 'rankings', localityId: localityId };
  }
  
  switch (path) {
    case '/terminos': return { page: 'terminos', localityId: null };
    case '/privacidad': return { page: 'privacidad', localityId: null };
    case '/rankings': return { page: 'rankings', localityId: null };
    case '/registro': return { page: 'registro', localityId: null };
    case '/add-review': return { page: 'addReview', localityId: null };
    case '/mis-calificaciones': return { page: 'myReviews', localityId: null };
    case '/perfil': return { page: 'profile', localityId: null };
    case '/please-verify-email': return { page: 'pleaseVerifyEmail', localityId: null };
    case '/':
    default:
      return { page: 'home', localityId: null };
  }
};


const App = () => {
  const initialState = getInitialStateFromPath();
  const [currentPage, setCurrentPage] = useState(initialState.page);
  const [selectedLocalityId, setSelectedLocalityId] = useState(initialState.localityId);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { currentUser, loadingAuth } = useAuth();

  console.log(`%cAPP RENDER: La página actual es '${currentPage}'`, "color: blue;");
  useEffect(() => {
    console.log(`%cAPP useEffect disparado. currentUser ha cambiado. La página actual es '${currentPage}'`, "color: red;");
    const handlePopState = () => {
      const state = getInitialStateFromPath();
      setCurrentPage(state.page);
      setSelectedLocalityId(state.localityId);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Tu useEffect de protección de rutas (sin cambios)
  useEffect(() => {
    if (!loadingAuth && currentUser) {
      if (!currentUser.emailVerified) {
        const safePagesWhileNotVerified = ['login', 'registro', 'pleaseVerifyEmail', 'home', 'rankings', 'terminos', 'privacidad'];
        if (!safePagesWhileNotVerified.includes(currentPage)) {
          navigateTo('pleaseVerifyEmail');
        }
      } else {
        if (['pleaseVerifyEmail', 'login', 'registro'].includes(currentPage)) {
          console.log(`%cAPP useEffect ¡ACCIÓN! Redirigiendo a 'profile' porque la página es '${currentPage}'`, "color: red; font-weight: bold;");
          navigateTo('profile');
        }
      }
    } else if (!loadingAuth && !currentUser) {
      const protectedPages = ['profile', 'addReview', 'myReviews', 'pleaseVerifyEmail'];
      if (protectedPages.includes(currentPage)) {
        if (!['home', 'login', 'registro', 'terminos', 'privacidad'].includes(currentPage)) {
          navigateTo('home');
        }
      }
    }
  }, [currentUser, loadingAuth, currentPage]);

  const navigateTo = (pageName) => {
    setSelectedLocalityId(null); 
    setCurrentPage(pageName);
    
    let path;
    // ✅ Switch completo con todas tus rutas restauradas
    switch (pageName) {
      case 'home': path = '/'; break;
      case 'rankings': path = '/rankings'; break;
      case 'profile': path = '/perfil'; break;
      case 'addReview': path = '/add-review'; break;
      case 'myReviews': path = '/mis-calificaciones'; break;
      case 'registro': path = '/registro'; break;
      case 'terminos': path = '/terminos'; break;
      case 'privacidad': path = '/privacidad'; break;
      case 'pleaseVerifyEmail': path = '/please-verify-email'; break;
      default: path = `/${pageName}`; // Por si acaso hay alguna no listada
    }
    if (window.location.pathname !== path) {
      window.history.pushState({ page: pageName }, `AlquiRate - ${pageName}`, path);
    }
  };
  
  const handleNavigateToLocality = (localityId) => {
    if (localityId) {
      setSelectedLocalityId(localityId);
      setCurrentPage('rankings');
      const path = `/localidad/${localityId}`;
      if (window.location.pathname !== path) {
        window.history.pushState({ localityId: localityId }, `AlquiRate - Detalle`, path);
      }
    }
  };

  const handleBackToRankings = () => {
    navigateTo('rankings');
  };
  

const handleRegister = async (formData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;
    
    const profileData = { 
      firstName: formData.firstName, lastName: formData.lastName, phone: formData.phone, address: formData.address,
      streetName: formData.streetName, streetNumber: formData.streetNumber, floorApartment: formData.floorApartment,
      city: formData.city, province: formData.province, postalCode: formData.postalCode, propertyType: formData.propertyType,
      userType: formData.userType, notifications: formData.notifications,
    };

    // 1. Guardamos el perfil en Firestore
    await createUserProfileDocument(user, profileData);
    
    // ✅ La línea problemática ha sido eliminada.
    
    // 2. Enviamos el email y navegamos
    await sendEmailVerification(user);
    toast.success('🎉 Registro exitoso. Verificá tu correo para activar la cuenta.');
    navigateTo('pleaseVerifyEmail');

  } catch (error) {
    console.error("🔴 App.js: Error en handleRegister:", error);
    let displayErrorMessage = 'Ocurrió un error durante el registro.';
    // ... tu lógica de manejo de errores ...
    toast.error(`⚠️ ${displayErrorMessage}`);
  }
};

  const renderPage = () => {
    // La vista de detalle tiene prioridad
    if (selectedLocalityId) {
      return <LocalityDetailPage localityId={selectedLocalityId} onBack={handleBackToRankings} />;
    }

    // ✅ Switch completo con todos tus componentes restaurados
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={navigateTo} setShowLoginModal={setShowLoginModal} />;
      case 'rankings': return <RankingsPage onLocalityClick={handleNavigateToLocality} />;
      case 'profile': return <ProfilePage />;
      case 'addReview': return <AddReviewPage setCurrentPage={navigateTo} />;
      case 'myReviews': return <MyReviewsPage setCurrentPage={navigateTo} />;
      case 'registro': return <RegisterPage setCurrentPage={navigateTo} onRegister={handleRegister} />;
      case 'pleaseVerifyEmail': return <PleaseVerifyEmailPage />;
      case 'terminos': return <TermsAndConditionsPage setCurrentPage={navigateTo} />;
      case 'privacidad': return <PrivacyPolicyPage setCurrentPage={navigateTo} />;
      default:
        console.warn(`Página no reconocida: ${currentPage}, mostrando Home.`);
        return <HomePage setCurrentPage={navigateTo} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <LayoutHeader
        currentPage={currentPage}
        setCurrentPage={navigateTo}
        setShowLoginModal={setShowLoginModal}
      />
      <main className="flex-grow pt-20"> {/* <--- ¡AQUÍ ESTÁ EL CAMBIO! */}
        {loadingAuth ? (<div>Cargando aplicación...</div>) : renderPage()}
      </main>
      <LayoutFooter setCurrentPage={navigateTo} />
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setCurrentPage={navigateTo}
          onLoginSuccess={() => { setShowLoginModal(false); }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;