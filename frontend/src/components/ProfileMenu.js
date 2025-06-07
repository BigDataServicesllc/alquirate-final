import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';

const ProfileMenu = ({ user, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const current = location.pathname;

  const isActive = (path) =>
    current === path ? 'text-blue-600 font-semibold' : 'text-gray-700';

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("alquirateUser");
      navigate('/');
      window.location.reload();
    });
  };

  return (
    <div className="rounded-2xl shadow-lg bg-white w-full max-w-sm mx-auto p-6 mt-4 text-center">
      {user?.photoURL && (
        <img
          src={user.photoURL}
          alt="Avatar"
          className="w-20 h-20 rounded-full mx-auto mb-2"
        />
      )}
      <p className="text-sm text-gray-600 mb-1">{user?.email}</p>

      <nav className="flex flex-col gap-3 my-4 text-base text-left">
        <button onClick={() => navigate('/profile')} className={isActive('/profile')}>
          Mi perfil
        </button>
        <button onClick={() => navigate('/')} className={isActive('/')}>
          Inicio
        </button>
        <button onClick={() => navigate('/rankings')} className={isActive('/rankings')}>
          Rankings
        </button>
        <button onClick={() => navigate('/review')} className={isActive('/review')}>
          Calificar
        </button>
      </nav>

      <div className="border-t pt-4 mt-4 space-y-3">
        <button
          onClick={() => navigate('/my-reviews')}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          📄 Ver mis calificaciones
        </button>
        <button
          onClick={() => navigate('/ratings')}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          🔍 Ver calificaciones
        </button>
        <button
          onClick={handleLogout}
          className="text-red-600 mt-3 text-sm font-medium hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
