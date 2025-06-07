// src/components/PleaseVerifyEmailPage.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sendEmailVerification, signOut, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

const PleaseVerifyEmailPage = () => {
  const { currentUser } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const auth = getAuth(); // Obtener instancia de auth

  const handleResendVerification = async () => {
    if (!currentUser) return;
    setIsSending(true);
    try {
      await sendEmailVerification(currentUser);
      toast.info("✉️ Correo de verificación reenviado. ¡Revisa tu bandeja de entrada (y spam)!");
    } catch (error) {
      console.error("Error reenviando verificación:", error);
      toast.error("Error al reenviar el correo de verificación.");
    } finally {
      setIsSending(false);
    }
  };

  const handleLogoutAndReturn = async () => {
    try {
      await signOut(auth);
      // setCurrentPage('home'); // App.js se encargará de esto por el cambio de currentUser
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Verifica tu Correo Electrónico</h1>
      {currentUser?.email && (
        <p className="text-gray-600 mb-4">
          Hemos enviado un enlace de verificación a <strong className="text-gray-700">{currentUser.email}</strong>.
        </p>
      )}
      <p className="text-gray-600 mb-8">
        Por favor, haz clic en ese enlace para activar tu cuenta. Si no lo encuentras, revisa tu carpeta de spam.
      </p>
      <div className="space-y-4">
        <button
          onClick={handleResendVerification}
          disabled={isSending}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {isSending ? 'Enviando...' : 'Reenviar Correo de Verificación'}
        </button>
        <p className="text-sm text-gray-500">
          ¿Ya lo verificaste? Intenta <button onClick={() => window.location.reload()} className="text-blue-600 hover:underline">refrescar la página</button>.
        </p>
        <button
          onClick={handleLogoutAndReturn}
          className="text-sm text-gray-600 hover:text-red-600 hover:underline mt-4"
        >
          Cerrar sesión e ir al inicio
        </button>
      </div>
    </div>
  );
};

export default PleaseVerifyEmailPage;