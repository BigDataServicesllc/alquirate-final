// src/components/AddReviewPage.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../utils/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

// Importaciones de los componentes de los pasos
import AddressStep from '../steps/AddressStep';
import RentDetails from '../steps/RentDetails';
import PropertyConditions from '../steps/PropertyConditions';
import ZoneEnvironment from '../steps/ZoneEnvironment';
import FinalReview from '../steps/FinalReview';




const TOTAL_STEPS = 5; // Son 5 pasos (0 a 4)

const AddReviewPage = ({ setCurrentPage }) => {
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(0); // Empezamos en el Paso 0 (Dirección)
  
  const [formData, setFormData] = useState({
    propertyFullAddress: '', 
    propertyCity: '', 
    propertyNeighborhood: '', 
    propertyPostalCode: '',
    propertyStreetName: '', 
    propertyStreetNumber: '', 
    propertyProvince: '',
    propertyFloor: '',
    propertyApartment: '',
    propertyCoordinates: { lat: null, lng: null },
    rentCurrency: 'ARS', rentAmount: '', hasRentalContract: false, bankPaymentAvailable: false,
    entryRequirements: [], entryRequirementsOtherText: '',
    conditionsSatisfactory: null, ownerResponsive: null, noiseLevel: '', petsAllowed: null, childFriendly: null,
    zoneSafety: 0, publicTransportNearby: null, leisureOptions: [],
    npsScore: 0, wouldRecommendPlace: null, publicComment: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === "leisureOptions" || name === "entryRequirements") {
        setFormData(prev => ({
          ...prev,
          [name]: checked
            ? [...(prev[name] || []), value]
            : (prev[name] || []).filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'radio') {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleRatingChange = (name, newRating) => {
    setFormData(prev => ({ ...prev, [name]: newRating }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  // En src/components/AddReviewPage.js

  const validateStep = (stepToValidate) => {
    const newErrors = {};
    let isValid = true;

    if (stepToValidate === 0) {
      if (!formData.propertyFullAddress.trim()) {
        newErrors.propertyFullAddress = 'La dirección (autocompletada o manual) es obligatoria.';
        isValid = false;
      }
      if (!formData.propertyProvince) {
        newErrors.propertyProvince = 'Selecciona una provincia.';
        isValid = false;
      }
      if (!formData.propertyCity.trim()) {
        newErrors.propertyCity = 'La ciudad/partido es obligatorio.';
        isValid = false;
      }
      if (!formData.propertyStreetName.trim()) {
        newErrors.propertyStreetName = 'El nombre de la calle es obligatorio.';
        isValid = false;
      }
      if (!formData.propertyStreetNumber.trim()) {
        newErrors.propertyStreetNumber = 'La altura (número) es obligatoria.';
        isValid = false;
      }
      // Puedes añadir más validaciones aquí para propertyPostalCode, etc., si son obligatorias
      // Ejemplo:
      // if (!formData.propertyPostalCode.trim()) {
      //   newErrors.propertyPostalCode = 'El código postal es obligatorio.';
      //   isValid = false;
      // }

    } else if (stepToValidate === 1) {
      if (!formData.rentCurrency) {
        newErrors.rentCurrency = 'Por favor, selecciona la moneda del alquiler.';
        isValid = false;
      }
      if (!formData.rentAmount) {
        newErrors.rentAmount = 'Por favor, ingresa el precio del alquiler.';
        isValid = false;
      } else if (isNaN(parseFloat(formData.rentAmount)) || parseFloat(formData.rentAmount) <= 0) {
        newErrors.rentAmount = 'El precio del alquiler debe ser un número positivo.';
        isValid = false;
      }
      if (typeof formData.hasRentalContract !== 'boolean') {
        newErrors.hasRentalContract = 'Indica si el arrendador ofreció un contrato.';
        isValid = false;
      }
      if (typeof formData.bankPaymentAvailable !== 'boolean') {
        newErrors.bankPaymentAvailable = 'Indica si se puede pagar por banco.';
        isValid = false;
      }
      if (formData.entryRequirements.includes('other') && (!formData.entryRequirementsOtherText || !formData.entryRequirementsOtherText.trim())) {
        newErrors.entryRequirements = 'Si seleccionaste "Otro tipo de garantía", por favor especifica cuál.';
        isValid = false;
      }
    } else if (stepToValidate === 2) {
        // TODO: Añadir validaciones para Paso 2 si es necesario
        // Ejemplo:
        // if (formData.conditionsSatisfactory === null) {
        //   newErrors.conditionsSatisfactory = 'Responde sobre las condiciones del inmueble.';
        //   isValid = false;
        // }
        // ... y así para los otros campos del Paso 2
    } else if (stepToValidate === 3) {
        // TODO: Añadir validaciones para Paso 3 si es necesario
        // Ejemplo:
        // if (formData.zoneSafety === 0) {
        //   newErrors.zoneSafety = 'Califica la seguridad de la zona.';
        //   isValid = false;
        // }
        // ... y así para los otros campos del Paso 3
    } else if (stepToValidate === 4) { // Validación para el Paso 4
        if (formData.npsScore === 0 || typeof formData.npsScore !== 'number') {
            newErrors.npsScore = 'Por favor, danos una puntuación de recomendación.';
            isValid = false;
        }
        if (typeof formData.wouldRecommendPlace !== 'boolean') {
            newErrors.wouldRecommendPlace = 'Indica si recomendarías el lugar.';
            isValid = false;
        }
        if (!formData.publicComment || !formData.publicComment.trim()) {
            newErrors.publicComment = 'Por favor, deja un comentario sobre tu experiencia.';
            isValid = false;
        } else if (formData.publicComment.trim().length < 20) {
            newErrors.publicComment = 'Tu comentario es muy corto, ¡cuéntanos un poco más! (mínimo 20 caracteres)';
            isValid = false;
        }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      }
    } else {
      toast.warn('Por favor, completa los campos marcados antes de continuar.', { position: "top-center" });
    }
  };

  // ***** AQUÍ ESTÁ LA FUNCIÓN handlePrevStep *****
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  // ***** FIN DE handlePrevStep *****

  const handleSubmit = async (e) => {
    console.log("handleSubmit INVOCADO. currentStep:", currentStep);
    e.preventDefault();
    
    // Validar el último paso de preguntas (Paso 4, que es TOTAL_STEPS - 1)
    const isStepValid = validateStep(TOTAL_STEPS - 1);
    console.log("Validación del último paso (Paso 4) es:", isStepValid);
    console.log("Condición del if de validación:", !isStepValid || currentStep !== TOTAL_STEPS - 1);

    // Asegurarse que estamos en el último paso Y que es válido
    if (!isStepValid || currentStep !== TOTAL_STEPS - 1 ) { 
        toast.error('Por favor, completa todos los campos requeridos del último paso.');
        console.log("Errores de validación:", errors);
        return;
    }

    console.log("Usuario actual antes del chequeo:", currentUser);
    if (!currentUser) {
        console.log("No hay currentUser, mostrando error y retornando.");
        toast.error('Debes iniciar sesión para enviar una calificación.');
        if (typeof setCurrentPage === 'function') setCurrentPage('login'); // O navigateTo
        return;
    }

    console.log("Procediendo a enviar datos...");
    setIsSubmitting(true);
    try {
      console.log("Dentro del TRY, preparando reviewData...");
      const reviewData = {
        userId: currentUser.uid,
        userProfileName: currentUser.displayName || `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim(),
        userProfilePhotoURL: currentUser.photoURL || null,
        propertyFullAddress: formData.propertyFullAddress,
        propertyCity: formData.propertyCity,
        propertyNeighborhood: formData.propertyNeighborhood,
        propertyPostalCode: formData.propertyPostalCode,
        propertyStreetName: formData.propertyStreetName || '',
        propertyStreetNumber: formData.propertyStreetNumber || '',
        propertyProvince: formData.propertyProvince || '',
        propertyFloor: formData.propertyFloor,
        propertyApartment: formData.propertyApartment,
        propertyParty: formData.propertyParty,
        propertyCoordinates: formData.propertyCoordinates.lat && formData.propertyCoordinates.lng ? formData.propertyCoordinates : null,
        rentCurrency: formData.rentCurrency,
        rentAmount: parseFloat(formData.rentAmount),
        hasRentalContract: formData.hasRentalContract,
        bankPaymentAvailable: formData.bankPaymentAvailable,
        entryRequirements: formData.entryRequirements,
        entryRequirementsOtherText: formData.entryRequirements.includes('other') ? formData.entryRequirementsOtherText.trim() : '',
        conditionsSatisfactory: formData.conditionsSatisfactory,
        ownerResponsive: formData.ownerResponsive,
        noiseLevel: formData.noiseLevel,
        petsAllowed: formData.petsAllowed,
        childFriendly: formData.childFriendly,
        zoneSafety: formData.zoneSafety,
        publicTransportNearby: formData.publicTransportNearby,
        leisureOptions: formData.leisureOptions,
        npsScore: formData.npsScore,
        wouldRecommendPlace: formData.wouldRecommendPlace,
        publicComment: formData.publicComment.trim(),
        isApproved: false,
        isArchived: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      console.log("reviewData a enviar:", JSON.stringify(reviewData, null, 2));

      await addDoc(collection(db, 'reviews'), reviewData);
      console.log("Datos enviados a Firestore EXITOSAMENTE!");

      toast.success('¡Gracias! Tu calificación ha sido enviada y está pendiente de revisión.');
      
      setFormData({ 
        propertyFullAddress: '', propertyCity: '', propertyNeighborhood: '', propertyPostalCode: '',
        propertyStreetName: '', propertyStreetNumber: '', propertyProvince: '',
        propertyCoordinates: { lat: null, lng: null },
        rentCurrency: 'ARS', rentAmount: '', hasRentalContract: false, bankPaymentAvailable: false, 
        entryRequirements: [], entryRequirementsOtherText: '',
        conditionsSatisfactory: null, ownerResponsive: null, noiseLevel: '', petsAllowed: null, childFriendly: null,
        zoneSafety: 0, publicTransportNearby: null, leisureOptions: [],
        npsScore: 0, wouldRecommendPlace: null, publicComment: '',
      });
      setCurrentStep(0);
      if (typeof setCurrentPage === 'function') {
        setCurrentPage('home');
      }

    } catch (error) {
      console.error("Error DENTRO del try/catch al enviar la calificación: ", error);
      toast.error('Hubo un error al enviar tu calificación. Inténtalo de nuevo.');
    } finally {
      console.log("Bloque FINALLY ejecutado.");
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <AddressStep
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                />;
      case 1:
        return <RentDetails formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <PropertyConditions formData={formData} handleChange={handleChange} handleRatingChange={handleRatingChange} errors={errors} />;
      case 3:
        return <ZoneEnvironment formData={formData} handleChange={handleChange} handleRatingChange={handleRatingChange} errors={errors} />;
      case 4:
        return <FinalReview formData={formData} handleChange={handleChange} handleRatingChange={handleRatingChange} errors={errors} />;
      default:
        return <p>Paso desconocido.</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
          Califica tu experiencia de alquiler
        </h1>
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between mb-1 text-xs md:text-sm">
            <span className="font-medium text-gray-600">Paso {currentStep + 1} de {TOTAL_STEPS}</span>
            <span className="font-medium text-gray-600">{Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
            <div
              className="bg-blue-600 h-2 md:h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          {renderStepContent()}
          <div className="mt-8 flex justify-between items-center">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handlePrevStep} // Aquí se llama
                disabled={isSubmitting}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Anterior
              </button>
            )}
            {currentStep === 0 && <div className="w-auto sm:w-1/3 invisible"></div>}
            {currentStep < TOTAL_STEPS - 1 && (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                Siguiente
              </button>
            )}
            {currentStep === TOTAL_STEPS - 1 && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Calificación'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewPage;