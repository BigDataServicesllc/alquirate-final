// src/components/LayoutHeader.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../utils/firebase';
import { toast } from 'react-toastify';

const LayoutHeader = ({ currentPage, setCurrentPage, setShowLoginModal, hideShadow = false }) => {
  const { currentUser, currentUserData } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setCurrentPage('home');
      setShowUserMenu(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  let avatarDisplaySrc = `https://api.dicebear.com/7.x/initials/svg?seed=User`;
  if (currentUser) {
    const photoFromFirestore = currentUserData?.photoURL;
    const photoFromAuth = currentUser?.photoURL;
    const emailForSeed = currentUserData?.email || currentUser?.email;
    const firstNameForSeed = currentUserData?.firstName;
    const lastNameForSeed = currentUserData?.lastName;

    if (photoFromFirestore) {
      avatarDisplaySrc = photoFromFirestore;
    } else if (photoFromAuth) {
      avatarDisplaySrc = photoFromAuth;
    } else if (firstNameForSeed && lastNameForSeed) {
      avatarDisplaySrc = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firstNameForSeed)}+${encodeURIComponent(lastNameForSeed)}`;
    } else if (emailForSeed) {
      avatarDisplaySrc = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(emailForSeed)}`;
    }
  }
  
  const userEmailDisplay = currentUserData?.email || currentUser?.email || 'No disponible';

  const navClass = (page) =>
    `text-gray-700 hover:text-blue-600 transition-colors py-2.5 block w-full rounded-md text-base hover:bg-gray-100 ${currentPage === page ? 'font-semibold text-blue-600 bg-blue-50' : ''}`;

  const handleMenuItemClick = (page) => {
    setCurrentPage(page);
    setShowUserMenu(false); // Cierra el menú de usuario de desktop si estuviera abierto
    setIsMenuOpen(false);   // Cierra el menú móvil
  };
  
  const handleMenuAuthActionClick = () => {
      setShowLoginModal(true);
      setIsMenuOpen(false);
  }

  return (
     <header className={`bg-white fixed top-0 left-0 right-0 z-30 ${!hideShadow ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => handleMenuItemClick('home')}
          >
            Alqui<span className="text-gray-800">Rate</span>
          </h1>

          {/* Menú para Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => handleMenuItemClick('home')} className={navClass('home').replace('py-2.5 block w-full rounded-md text-base hover:bg-gray-100', '')}>Inicio</button> {/* Quitar clases de bloque del menú móvil */}
            <button onClick={() => handleMenuItemClick('rankings')} className={navClass('rankings').replace('py-2.5 block w-full rounded-md text-base hover:bg-gray-100', '')}>Rankings</button>
            <button onClick={() => {
              if (currentUser) {
                handleMenuItemClick('addReview');
              } else {
                setShowLoginModal(true);
              }
            }} className={navClass('addReview').replace('py-2.5 block w-full rounded-md text-base hover:bg-gray-100', '')}>Calificar</button>

            {currentUser ? (
              <div className="relative" ref={menuRef}>
                <img
                  src={avatarDisplaySrc}
                  alt="avatar"
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 object-cover"
                  onClick={toggleUserMenu}
                />
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg text-sm text-gray-700 z-50 p-3 space-y-1">
                    <div className="text-xs text-gray-500 truncate px-2 pb-1" title={userEmailDisplay}>{userEmailDisplay}</div>
                    <button onClick={() => handleMenuItemClick('profile')} className={`block w-full text-left px-2 py-1.5 rounded hover:bg-gray-100 ${currentPage === 'profile' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>Mi perfil</button>
                    <hr className="my-1"/>
                    <button onClick={() => handleMenuItemClick('home')} className="block w-full text-left hover:bg-gray-100 px-2 py-1.5 rounded">Inicio</button>
                    <button onClick={() => handleMenuItemClick('rankings')} className="block w-full text-left hover:bg-gray-100 px-2 py-1.5 rounded">Rankings</button>
                    <button onClick={() => handleMenuItemClick('addReview')} className="block w-full text-left hover:bg-gray-100 px-2 py-1.5 rounded">Calificar</button>
                    <hr className="my-1"/>
                    <button onClick={() => handleMenuItemClick('myReviews')} className="block w-full text-left hover:bg-gray-100 px-2 py-1.5 rounded">📄 Ver mis calificaciones</button>
                    <button onClick={handleLogout} className="block w-full text-left text-red-600 hover:bg-red-50 px-2 py-1.5 rounded">🚪 Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition-all"
              >
                Iniciar sesión
              </button>
            )}
          </div>

          <button onClick={toggleMenu} className="md:hidden text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menú Desplegable para Móvil - REDISEÑADO */}
        {isMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={toggleMenu} // Cierra el menú si se hace clic en el overlay
          >
            <div 
              className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-6 text-center relative"
              onClick={(e) => e.stopPropagation()} // Evita que el clic en el modal cierre el menú
            >
              {/* Botón para cerrar el modal del menú */}
              <button 
                onClick={toggleMenu} 
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar menú"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              {/* Logo */}
              <h2 className="text-2xl font-bold text-blue-600 mb-2">
                Alqui<span className="text-gray-800">Rate</span>
              </h2>
              
              {/* Texto Amigable */}
              <p className="text-sm text-gray-600 mb-6">
                {currentUser ? `¡Hola, ${currentUserData?.firstName || currentUser?.email}! ¿Qué deseas hacer?` : 'Tu aliado al alquilar'}
              </p>

              <div className="space-y-2">
                {currentUser && (
                  <div className="mb-4">
                    <img src={avatarDisplaySrc} alt="avatar" className="w-16 h-16 rounded-full mx-auto border object-cover mb-2" />
                    <button onClick={() => handleMenuItemClick('profile')} className={navClass('profile')}>Mi perfil</button>
                    <hr className="my-3"/>
                  </div>
                )}
                
                <button onClick={() => handleMenuItemClick('home')} className={navClass('home')}>Inicio</button>
                <button onClick={() => handleMenuItemClick('rankings')} className={navClass('rankings')}>Rankings</button>
                <button onClick={() => {
                  if (currentUser) {
                    handleMenuItemClick('addReview');
                  } else {
                    // setShowLoginModal(true); setIsMenuOpen(false); // Ya se maneja en handleMenuAuthActionClick
                    handleMenuAuthActionClick();
                  }
                }} className={navClass('addReview')}>Calificar</button>
                
                {currentUser && (
                  <>
                    <hr className="my-3"/>
                    <button onClick={() => handleMenuItemClick('myReviews')} className={navClass('myReviews')}>📄 Ver mis calificaciones</button>
                    <button onClick={handleLogout} className="block w-full text-center text-red-600 hover:bg-red-50 py-2.5 rounded-md text-base mt-2">🚪 Cerrar sesión</button>
                  </>
                )}
                
                {!currentUser && (
                  <button
                    onClick={handleMenuAuthActionClick}
                    className="mt-4 w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-blue-700 transition text-base font-medium"
                  >
                    Iniciar sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;