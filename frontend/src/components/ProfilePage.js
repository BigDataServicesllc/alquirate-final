// src/components/ProfilePage.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db, storage } from '../utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { currentUser, userProfile, loading } = useAuth();

  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '',
    streetName: '', streetNumber: '', floorApartment: '', city: '',
    province: '', postalCode: '', propertyType: '', photoURL: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (!loading) {
      if (userProfile) {
        setProfileData({
          ...userProfile,
          email: currentUser?.email || '',
          photoURL: currentUser?.photoURL || userProfile.photoURL || '',
        });
        if (currentUser?.photoURL) {
          setImagePreview(currentUser.photoURL);
        }
      } else if (currentUser) {
        setProfileData(prev => ({
          ...prev,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          firstName: currentUser.displayName?.split(' ')[0] || '',
          lastName: currentUser.displayName?.split(' ').slice(1).join(' ') || '',
        }));
        if (currentUser.photoURL) {
          setImagePreview(currentUser.photoURL);
        }
      }
    }
  }, [currentUser, userProfile, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => { setImagePreview(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => fileInputRef.current.click();

  const handleUploadAndChangePhoto = async () => {
    if (!selectedFile || !currentUser) return;
    setIsUploading(true);
    const userId = currentUser.uid;
    const imageRef = storageRef(storage, `profileImages/${userId}/profilePicture`);
    try {
      await uploadBytes(imageRef, selectedFile);
      const downloadURL = await getDownloadURL(imageRef);
      await updateProfile(currentUser, { photoURL: downloadURL });
      await updateDoc(doc(db, 'users', userId), { photoURL: downloadURL });
      setProfileData(prev => ({ ...prev, photoURL: downloadURL }));
      setSelectedFile(null);
      toast.success("¡Foto de perfil actualizada!");
    } catch (error) {
      toast.error("Error al cambiar la foto.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSaving(true);
    const userDocRef = doc(db, 'users', currentUser.uid);
    try {
      const { email, photoURL, ...dataToSave } = profileData;
      await updateDoc(userDocRef, { ...dataToSave, updatedAt: new Date() });
      toast.success("Perfil actualizado con éxito!");
    } catch (err) {
      toast.error("Error al guardar el perfil.");
    }
    setIsSaving(false);
  };

  const handlePasswordRecovery = async () => {
    if (currentUser?.email) {
      try {
        await sendPasswordResetEmail(auth, currentUser.email);
        toast.info("Se ha enviado un enlace de recuperación a tu correo.");
      } catch (error) {
        toast.error("Error al enviar el enlace.");
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Cargando perfil...</p></div>;
  }

  if (!currentUser) {
    return <div className="text-center py-20">Por favor, inicia sesión para ver tu perfil.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Mi Perfil</h1>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <img
              src={imagePreview || `https://ui-avatars.com/api/?name=${profileData.firstName || 'S'}+${profileData.lastName || 'N'}&background=random&color=fff&size=128`}
              alt="Foto de perfil"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-300 shadow-md"
            />
            <button onClick={triggerFileSelect} disabled={isUploading} className="absolute inset-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center rounded-full transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden"/>
          {selectedFile && (
            <button onClick={handleUploadAndChangePhoto} disabled={isUploading} className="mt-3 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50">
              {isUploading ? 'Subiendo...' : 'Confirmar foto'}
            </button>
          )}
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input type="text" name="firstName" id="firstName" value={profileData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input type="text" name="lastName" id="lastName" value={profileData.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input type="email" name="email" id="email" value={profileData.email} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"/>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono (opcional)</label>
            <input type="tel" name="phone" id="phone" value={profileData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
          </div>
          
          <button type="submit" disabled={isSaving || isUploading} className="w-full mt-6 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50">
            {isSaving ? 'Guardando...' : 'Guardar perfil'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600 mb-1">¿Querés cambiar tu contraseña?</p>
          <button onClick={handlePasswordRecovery} className="text-sm text-blue-600 hover:underline font-medium">
            Enviar enlace de recuperación
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;