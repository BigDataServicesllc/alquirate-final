import React, { useState } from 'react';
import { auth } from '../utils/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth';
import CustomToast from './CustomToast';

const EmailAuthForm = () => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(result.user);

      localStorage.setItem("alquirateUser", JSON.stringify({
        uid: result.user.uid,
        email: result.user.email
      }));

      setShowToast(true);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error("❌ Error al registrar usuario:", err);
      setError('No se pudo crear la cuenta.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register') {
      if (password !== confirm) {
        setError('Las contraseñas no coinciden.');
        return;
      }
      await handleRegister();
    } else {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("alquirateUser", JSON.stringify({
          uid: result.user.uid,
          email: result.user.email
        }));
        window.location.reload();
      } catch (err) {
        console.error("❌ Error al iniciar sesión:", err);
        setError('Email o contraseña incorrectos.');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
          required
        />
        {mode === 'register' && (
          <input
            type="password"
            value={confirm}
            placeholder="Confirmar contraseña"
            onChange={(e) => setConfirm(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
            required
          />
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </button>
      </form>

      <p className="text-sm text-gray-600 mt-3">
        {mode === 'login' ? (
          <>
            ¿No tenés cuenta?{' '}
            <button
              onClick={() => setMode('register')}
              className="text-blue-600 underline"
            >
              Registrate
            </button>
          </>
        ) : (
          <>
            ¿Ya tenés cuenta?{' '}
            <button
              onClick={() => setMode('login')}
              className="text-blue-600 underline"
            >
              Iniciá sesión
            </button>
          </>
        )}
      </p>

      <CustomToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={{
          title: 'Cuenta creada correctamente',
          body: 'Revisá tu correo para verificar tu cuenta.',
        }}
      />
    </>
  );
};

export default EmailAuthForm;
