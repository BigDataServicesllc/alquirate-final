// src/components/LoginModal.js
import React, { useState } from 'react';
import { auth, googleProvider } from '../utils/firebase'; 
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginModal = ({ onClose, setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para deshabilitar botones durante la acción
  
  // Nuevos estados para la lógica de reenvío de verificación
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [lastUserAttempt, setLastUserAttempt] = useState(null); // Para guardar el usuario no verificado

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setShowResendVerification(false);
    setLastUserAttempt(null);
    setIsLoading(true); // Inicia carga

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("LoginModal: Usuario intentando iniciar sesión:", user.uid, "Email verificado:", user.emailVerified);

      if (!user.emailVerified) {
        setLastUserAttempt(user); // Guardar el usuario para poder reenviar la verificación
        setMessage('⚠️ Tu cuenta no está verificada. Por favor, revisa tu correo (incluyendo spam) y haz clic en el enlace de verificación.');
        setShowResendVerification(true); // Mostrar opción para reenviar
        // Opcional: cerrar sesión inmediatamente para que no quede "semi-logueado"
        // await signOut(auth); 
        // console.log("LoginModal: Usuario no verificado, sesión cerrada (opcional).");
        setIsLoading(false); // Termina carga
        return; // No cerrar el modal, no continuar.
      }
  
      // Si el email está verificado, proceder normalmente
      console.log("LoginModal: Usuario verificado, cerrando modal.");
      toast.success(`¡Bienvenido de nuevo!`);
      onClose(); // Cierra el modal y permite el acceso
      // El AuthContext se encargará de actualizar el estado global del usuario

    } catch (error) {
      console.error("❌ Error al iniciar sesión (LoginModal):", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setMessage('Correo electrónico o contraseña incorrectos.');
      } else if (error.code === 'auth/too-many-requests') {
        setMessage('Demasiados intentos. Intenta de nuevo más tarde.');
      } else {
        setMessage('Error al iniciar sesión. Intenta de nuevo.');
      }
      setShowResendVerification(false);
    } finally {
      setIsLoading(false); // Termina carga en cualquier caso
    }
  };
  
  const handleResendVerificationEmail = async () => {
    if (!lastUserAttempt) return;
    setIsLoading(true);
    try {
        await sendEmailVerification(lastUserAttempt);
        toast.info("✉️ Se ha reenviado el correo de verificación. ¡Revisa tu bandeja de entrada!");
        setMessage("Correo de verificación reenviado. Por favor, revisa tu email y luego intenta iniciar sesión de nuevo.");
        setShowResendVerification(false); // Ocultar botón después de reenviar
    } catch (error) {
        console.error("❌ Error al reenviar email de verificación:", error);
        toast.error("Error al reenviar el correo de verificación.");
        setMessage("Hubo un error al reenviar el correo. Intenta de nuevo más tarde.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => { // Convertido a async para manejar isLoading
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // El onAuthStateChanged en AuthContext manejará el cierre del modal si el login es exitoso
      // y si el usuario de Google ya está verificado (lo cual suele ser el caso).
      // Si necesitaras verificar algo específico del usuario de Google antes de cerrar, lo harías aquí.
      onClose(); // Asumimos que el login de Google es exitoso y verificado.
    } catch (error) {
      console.error("❌ Error al iniciar sesión con Google:", error);
      toast.error("Error al iniciar sesión con Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordResetWrapped = async (e) => { // Wrapper para manejar isLoading
    e.preventDefault();
    if (!email) {
      setMessage('Ingresá tu correo para recuperar la contraseña.');
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Te enviamos un correo para restablecer tu contraseña.');
      toast.info("✉️ Correo de recuperación enviado.");
    } catch (error) {
      console.error("❌ Error al enviar correo de recuperación:", error);
      setMessage('Error al enviar el correo. Verificá tu email.');
      toast.error("Error al enviar correo de recuperación.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xs sm:max-w-sm p-6 sm:p-8 rounded-2xl shadow-xl relative">
        <button 
            onClick={onClose} 
            disabled={isLoading}
            className="absolute top-3 left-3 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            aria-label="Cerrar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          <span className="sr-only">Atrás</span>
        </button>
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2 pt-4"> {/* Añadido pt-4 por el botón de atrás */}
          <span className="text-blue-600">Alqui</span>Rate
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Ingresá a tu cuenta para continuar.
        </p>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="sr-only">Correo electrónico</label>
            <input
              id="login-email"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full border-gray-300 rounded-lg p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
              required
            />
          </div>
          <div>
            <label htmlFor="login-password" className="sr-only">Contraseña</label>
            <input
              id="login-password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full border-gray-300 rounded-lg p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium text-sm disabled:opacity-70"
          >
            {isLoading && !showResendVerification ? 'Iniciando...' : 'Iniciar sesión'}
          </button>
        </form>

        {message && (
            <p className={`text-center text-xs mt-3 px-1 ${showResendVerification ? 'text-orange-600 font-medium' : (message.startsWith('Error') || message.startsWith('⚠️') ? 'text-red-600' : 'text-green-600')}`}>
                {message}
            </p>
        )}
        
        {showResendVerification && (
          <button
            onClick={handleResendVerificationEmail}
            disabled={isLoading}
            className="w-full mt-2 text-sm text-blue-600 hover:underline disabled:opacity-70"
          >
            {isLoading ? 'Enviando...' : 'Reenviar correo de verificación'}
          </button>
        )}

        <div className="text-center mt-3">
            <button // Cambiado de <a> a <button> para mejor semántica si no es un link real
                onClick={handlePasswordResetWrapped}
                disabled={isLoading}
                className="text-xs text-blue-600 hover:underline"
            >
                ¿Olvidaste tu contraseña?
            </button>
        </div>


        <div className="my-5 relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">o ingresá con</span>
            </div>
        </div>


        <div className="flex justify-center">
          <button 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
            className="text-gray-500 hover:text-blue-600 transition-colors p-2 border rounded-full hover:bg-gray-100 disabled:opacity-70"
            aria-label="Iniciar sesión con Google"
          >
            <FaGoogle className="w-5 h-5" />
          </button>
          {/* Aquí podrías añadir botones para Facebook y Apple si los implementas */}
        </div>

        <p className="text-xs text-center mt-6 text-gray-500">
          ¿No tenés cuenta?{' '}
          <button
            onClick={() => {
              if (isLoading) return;
              onClose(); // Cierra el modal de login
              setCurrentPage('registro'); // Cambia a la página de registro
            }}
            disabled={isLoading}
            className="text-blue-600 hover:underline font-medium"
          >
            Registrate
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;