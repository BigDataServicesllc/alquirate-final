// src/components/RegisterPage.js
import React, { useState, useEffect, useRef } from 'react';

const RegisterPage = ({ setCurrentPage, onRegister }) => {
  // ... (todo tu estado y funciones existentes se mantienen igual) ...
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    phone: '', address: '', streetName: '', streetNumber: '', floorApartment: '',
    city: '', province: '', postalCode: '', propertyType: '',
    userType: 'inquilino', notifications: true, termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (step === 2 && addressInputRef.current && window.google && window.google.maps && window.google.maps.places) {
      if (!autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          { types: ['address'], componentRestrictions: { country: 'ar' }, fields: ['address_components', 'formatted_address', 'geometry'] }
        );
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.address_components) {
            let newStreetName = '', newStreetNumber = '', newCity = '', newProvince = '', newPostalCode = '';
            place.address_components.forEach(component => {
              const types = component.types;
              if (types.includes('route')) newStreetName = component.long_name;
              if (types.includes('street_number')) newStreetNumber = component.long_name;
              if (types.includes('locality')) newCity = component.long_name;
              if (types.includes('administrative_area_level_1')) newProvince = component.long_name;
              if (types.includes('postal_code')) newPostalCode = component.long_name;
            });
            setFormData(prevData => ({
              ...prevData,
              address: place.formatted_address || `${newStreetName} ${newStreetNumber}`,
              streetName: newStreetName, streetNumber: newStreetNumber, city: newCity,
              province: newProvince, postalCode: newPostalCode,
            }));
            setErrors(prevErrors => ({ ...prevErrors, address: '', streetNumber: '', city: '' }));
          } else {
            setFormData(prevData => ({
              ...prevData,
              address: addressInputRef.current ? addressInputRef.current.value : prevData.address,
              streetName: '', streetNumber: '', city: '', province: '', postalCode: '',
            }));
          }
        });
      }
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
      if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio';
      if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El email no es válido';
      if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
      else if (formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    } else if (currentStep === 2) {
      if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
      if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
      if (!formData.streetNumber.trim()) newErrors.streetNumber = 'La altura (número) es obligatoria';
      if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
      if (!formData.propertyType.trim()) newErrors.propertyType = 'El tipo de vivienda es obligatorio';
    } else if (currentStep === 3) {
      if (!formData.termsAccepted) newErrors.termsAccepted = 'Debes aceptar los términos y condiciones';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateStep(step)) { setStep(step + 1); window.scrollTo(0, 0); }
  };
  
  const handlePrevStep = () => { setStep(step - 1); window.scrollTo(0, 0); };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) { onRegister(formData); }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Crear una cuenta en AlquiRate</h1>
        
        {step < 4 && (
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between mb-1 text-xs md:text-sm">
              <span className="font-medium text-gray-600">Paso {step} de 3</span>
              <span className="font-medium text-gray-600">{Math.round((step / 3) * 100)}% completado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
              <div className="bg-blue-600 h-2 md:h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          {/* --- PASO 1: INFORMACIÓN PERSONAL --- */}
          {step === 1 && (
            <>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">Información personal</h2>
              {/* ... campos del paso 1 sin cambios ... */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}/>
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}/>
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}/>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'}`}/>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  <p className="text-gray-500 text-xs mt-1">Debe tener al menos 8 caracteres.</p>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}/>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button type="button" onClick={handleNextStep} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Siguiente</button>
              </div>
            </>
          )}
          
          {/* --- PASO 2: INFORMACIÓN DE CONTACTO Y DIRECCIÓN --- */}
          {step === 2 && (
            <>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">Información de contacto y dirección</h2>
              {/* ... campos del paso 2 sin cambios ... */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Ej: 1123456789" className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}/>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="addressAutocomplete" className="block text-sm font-medium text-gray-700 mb-1">Dirección (autocompletar)</label>
                  <input ref={addressInputRef} type="text" id="addressAutocomplete" name="address" value={formData.address} onChange={handleChange} placeholder="Comienza a escribir tu dirección..." className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.address ? 'border-red-500' : 'border-gray-300'}`}/>
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="streetNumber" className="block text-sm font-medium text-gray-700 mb-1">Altura (número)</label>
                    <input type="text" id="streetNumber" name="streetNumber" value={formData.streetNumber} onChange={handleChange} placeholder="Ej: 1234" className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.streetNumber ? 'border-red-500' : 'border-gray-300'}`}/>
                    {errors.streetNumber && <p className="text-red-500 text-xs mt-1">{errors.streetNumber}</p>}
                  </div>
                  <div>
                    <label htmlFor="floorApartment" className="block text-sm font-medium text-gray-700 mb-1">Piso / Depto (opcional)</label>
                    <input type="text" id="floorApartment" name="floorApartment" value={formData.floorApartment} onChange={handleChange} placeholder="Ej: 3B, PB" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Ej: Buenos Aires" className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.city ? 'border-red-500' : 'border-gray-300'}`}/>
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de vivienda</label>
                  <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.propertyType ? 'border-red-500' : 'border-gray-300'}`}>
                    <option value="">Selecciona un tipo</option>
                    <option value="departamento">Departamento</option>
                    <option value="casa">Casa</option>
                    <option value="ph">PH (Propiedad Horizontal)</option>
                    <option value="local_comercial">Local comercial</option>
                    <option value="oficina">Oficina</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button type="button" onClick={handlePrevStep} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Anterior</button>
                <button type="button" onClick={handleNextStep} className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Siguiente</button>
              </div>
            </>
          )}
          
          {/* --- PASO 3: PREFERENCIAS --- */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-6">Preferencias</h2>
              <div className="space-y-5">
                {/* ... userType y notifications sin cambios ... */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">¿Cómo utilizarás AlquiRate?</label>
                  <div className="space-y-2">
                    <label className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <input type="radio" name="userType" value="inquilino" checked={formData.userType === 'inquilino'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                      <span className="ml-2 text-sm text-gray-700">Como inquilino (busco propiedades para alquilar)</span>
                    </label>
                    <label className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                      <input type="radio" name="userType" value="propietario" checked={formData.userType === 'propietario'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                      <span className="ml-2 text-sm text-gray-700">Como propietario (tengo propiedades para alquilar)</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <input type="checkbox" name="notifications" checked={formData.notifications} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                    <span className="ml-2 text-sm text-gray-700">Quiero recibir notificaciones sobre nuevas propiedades y actualizaciones.</span>
                  </label>
                </div>
                {/* ***** INICIO DE LA MODIFICACIÓN ***** */}
                <div>
                  <label className="flex items-start p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      name="termsAccepted" 
                      checked={formData.termsAccepted} 
                      onChange={handleChange} 
                      className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5 ${errors.termsAccepted ? 'border-red-500 ring-red-500' : ''}`}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Acepto los{' '}
                      <a 
                        href="/terminos" // O la ruta que hayas definido en App.js y tu servidor
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Términos y Condiciones
                      </a>
                      {' '}y la{' '}
                      <a 
                        href="/privacidad" // O la ruta que hayas definido en App.js y tu servidor
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Política de Privacidad
                      </a>
                      {' '}de AlquiRate.
                    </span>
                  </label>
                  {errors.termsAccepted && <p className="text-red-500 text-xs mt-1 ml-6">{errors.termsAccepted}</p>}
                </div>
                {/* ***** FIN DE LA MODIFICACIÓN ***** */}
              </div>
              <div className="mt-8 flex justify-between">
                <button type="button" onClick={handlePrevStep} className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Anterior</button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">Completar registro</button>
              </div>
            </form>
          )}
        </div>
        
        {step < 4 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta? 
              <button 
                onClick={() => setCurrentPage('login')} // Esto está bien, es para cambiar de página en la misma app
                className="ml-1 font-medium text-blue-600 hover:underline"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;