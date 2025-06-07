// src/steps/AddressStep.js
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { db } from '../utils/firebase'; 
import { collection, getDocs, query as firestoreQuery, where, orderBy } from 'firebase/firestore';

const AddressStep = ({ formData, setFormData, errors }) => {
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  const [provinces, setProvinces] = useState([]);
  const [parties, setParties] = useState([]);
  const [localities, setLocalities] = useState([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingParties, setLoadingParties] = useState(false);
  const [loadingLocalities, setLoadingLocalities] = useState(false);

  const [selectedProvinceId, setSelectedProvinceId] = useState(''); 
  const [selectedPartyId, setSelectedPartyId] = useState('');     

  const handleLocalInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'propertyProvince') {
      const provinceObject = provinces.find(p => p.name === value);
      const newSelectedProvinceId = provinceObject ? provinceObject.id : '';
      setSelectedProvinceId(newSelectedProvinceId); // Actualiza el ID para cargar los partidos
      
      // Actualiza el nombre de la provincia en formData y resetea partido y localidad
      setFormData(prev => ({
        ...prev,
        [name]: value,          // Actualiza propertyProvince con el nombre seleccionado
        propertyParty: '',      // Resetea el nombre del partido en formData
        propertyLocality: '',   // Resetea el nombre de la localidad en formData
      }));
      
    } else if (name === 'propertyParty') {
      const partyObject = parties.find(p => p.name === value);
      const newSelectedPartyId = partyObject ? partyObject.id : '';  // ✅ usa el ID generado por Firestore
      setSelectedPartyId(newSelectedPartyId); // Actualiza el ID para cargar las localidades

      // Actualiza el nombre del partido en formData y resetea la localidad
      setFormData(prev => ({
        ...prev,
        [name]: value,          // Actualiza propertyParty con el nombre seleccionado
        propertyLocality: '',   // Resetea el nombre de la localidad en formData
      }));

    } else { // Para todos los demás inputs (propertyLocality, propertyCity, etc.)
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  // Cargar Provincias
  useEffect(() => {
    const fetchProvinces = async () => {
      
      setLoadingProvinces(true);
      try {
        const provincesCol = collection(db, 'provinces');
        const q = firestoreQuery(provincesCol, orderBy('name'));
        const provinceSnapshot = await getDocs(q);
        const provinceList = provinceSnapshot.docs.map(doc => ({
          id: doc.id,                         // ✅ usar el ID del documento
          name: doc.data().name,
          name_normalized: doc.data().name_normalized,  // si lo usás en búsquedas
          countryId: doc.data().countryId
        }));
        setProvinces(provinceList);
      } catch (error) { console.error("Error cargando provincias:", error); }
      finally { 
        setLoadingProvinces(false); }
      
    };
    fetchProvinces();
  }, []);

// Cargar Partidos cuando selectedProvinceId cambia
useEffect(() => {
  if (!selectedProvinceId) {
    setParties([]);
    setSelectedPartyId('');
    setLocalities([]);
    return;
  }

  const fetchParties = async () => {
    setLoadingParties(true);
    setParties([]); // Limpiar lista anterior
    setLocalities([]);
    setSelectedPartyId('');

    try {
      const partiesCol = collection(db, 'parties');
      const q = firestoreQuery(
        partiesCol,
        where('provinceId', '==', selectedProvinceId),
        orderBy('comunaNumber'),
        orderBy('name') // Orden alfabético, opcional
      );

      const partySnapshot = await getDocs(q);

      const partyList = partySnapshot.docs.map(doc => ({
        id: doc.id,                         // <== Este es el partyId que vas a usar
        name: doc.data().name,
        name_normalized: doc.data().name_normalized,
        provinceId: doc.data().provinceId
        // Podés incluir otros campos como comunaNumber si lo usás
      }));

      setParties(partyList);
    } catch (error) {
      console.error("Error cargando partidos:", error);
    } finally {
      setLoadingParties(false);
    }
  };

  fetchParties();
}, [selectedProvinceId]);


  // Cargar Localidades cuando selectedPartyId cambia
useEffect(() => {
  console.log("EFFECT Localidades: Disparado. selectedPartyId:", selectedPartyId);

  if (!selectedPartyId) {
    setLocalities([]);
    return;
  }

  const fetchLocalities = async () => {
    console.log("FETCHING Localidades para partyId:", selectedPartyId);
    setLoadingLocalities(true);
    setLocalities([]); // Limpiar lista

    try {
      const localitiesCol = collection(db, "localities");
      const q = firestoreQuery(
        localitiesCol,
        where("partyId", "==", selectedPartyId), // ✅ Campo corregido
        orderBy("name")                          // Orden alfabético por nombre
      );

      const localitySnapshot = await getDocs(q);

      const localityList = localitySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          name_normalized: data.name_normalized,
          partyId: data.partyId
        };
      });

      setLocalities(localityList);
      console.log("Localidades cargadas:", localityList);
    } catch (error) {
      console.error("Error cargando localidades:", error);
    } finally {
      setLoadingLocalities(false);
    }
  };

  fetchLocalities();
}, [selectedPartyId]);



  const initAutocomplete = useCallback(() => {
    if (addressInputRef.current && window.google && window.google.maps && window.google.maps.places) {
      if (!autocompleteRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          { types: ['address'], componentRestrictions: { country: 'ar' }, fields: ['address_components', 'formatted_address', 'geometry'] }
        );

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.address_components) {
            let streetName = '', streetNumber = '', cityFromGoogle = '', neighborhoodFromGoogle = '', postalCodeFromGoogle = '', provinceNameFromGoogle = '', partyNameFromGoogle = '';
            
            place.address_components.forEach(component => {
              const types = component.types;
              if (types.includes('route')) streetName = component.long_name;
              if (types.includes('street_number')) streetNumber = component.long_name;
              if (types.includes('locality')) cityFromGoogle = component.long_name;
              if (types.includes('administrative_area_level_2') && !cityFromGoogle) cityFromGoogle = component.long_name; // Partido/Dpto
              if (types.includes('sublocality_level_1') && !neighborhoodFromGoogle) neighborhoodFromGoogle = component.long_name;
              if (types.includes('neighborhood')) neighborhoodFromGoogle = component.long_name;
              if (types.includes('postal_code')) postalCodeFromGoogle = component.long_name;
              if (types.includes('administrative_area_level_1')) provinceNameFromGoogle = component.long_name; // Nombre de provincia de Google
            });

            // Actualizamos formData con los datos de Google,
            // pero dejamos propertyProvince, propertyParty, y propertyLocality vacíos
            // para que el usuario los seleccione de los desplegables.
            setFormData(prevData => ({
              ...prevData,
              propertyFullAddress: place.formatted_address || '', // Dirección completa de Google
              propertyStreetName: streetName,                     // Calle de Google
              propertyStreetNumber: streetNumber,                   // Altura de Google
              propertyCity: cityFromGoogle,                       // "Ciudad/Localidad Principal (según Google)"
              propertyNeighborhood: neighborhoodFromGoogle,       // "Barrio (Si no se autocompletó, ingrésalo)"
              propertyPostalCode: postalCodeFromGoogle,             // Código Postal (oculto, pero guardado)
              
              // Estos se dejan vacíos para que el usuario los seleccione de los desplegables.
              // El nombre de la provincia de Google (provinceNameFromGoogle) no se usa para setear propertyProvince aquí.
              propertyProvince: '', 
              propertyParty: '',    
              propertyLocality: '', 
              
              propertyCoordinates: place.geometry?.location ? { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } : { lat: null, lng: null },
            }));

            // Limpiamos los IDs seleccionados para asegurar que los desplegables de Partido y Localidad se reseteen.
            setSelectedProvinceId('');
            setSelectedPartyId(''); 

          } else {
            // Si no se selecciona lugar o se borra el input de Google, limpiamos los campos relacionados con Google
            // y los desplegables.
            setFormData(prevData => ({ 
                ...prevData, 
                propertyFullAddress: addressInputRef.current ? addressInputRef.current.value : '', // Mantener lo que el usuario pudo haber escrito en el input de Google
                propertyStreetName: '', 
                propertyStreetNumber: '', 
                propertyCity: '',       // Limpiar ciudad de Google
                propertyNeighborhood: '', // Limpiar barrio de Google
                propertyPostalCode: '',   // Limpiar CP de Google
                propertyProvince: '',     // Limpiar selección de provincia en formData
                propertyParty: '',        // Limpiar selección de partido en formData
                propertyLocality: '',     // Limpiar selección de localidad en formData
                propertyCoordinates: { lat: null, lng: null } 
            }));
            setSelectedProvinceId(''); // Limpiar ID de provincia seleccionado
            setSelectedPartyId('');  // Limpiar ID de partido seleccionado
          }
        });
      }
    }
  // Ya no necesitamos 'provinces' como dependencia aquí si no hacemos matching
  }, [setFormData]);

  useEffect(() => {
    const loadGoogleMapsScript = () => { window.initMapGlobally = initAutocomplete; const script = document.createElement('script'); script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMapGlobally`; script.async = true; script.defer = true; document.head.appendChild(script);};
     if (!window.google || !window.google.maps || !window.google.maps.places) { if (!document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) { loadGoogleMapsScript(); } else { const checkGoogleInterval = setInterval(() => { if (window.google && window.google.maps && window.google.maps.places) { clearInterval(checkGoogleInterval); initAutocomplete(); } }, 100); return () => clearInterval(checkGoogleInterval); } } else { initAutocomplete(); } return () => { if (window.initMapGlobally === initAutocomplete) { delete window.initMapGlobally; } };
  }, [initAutocomplete]);

  const handleGoogleAddressInputChange = (e) => {
    setFormData(prevData => ({ ...prevData, propertyFullAddress: e.target.value }));
  };

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-1">Dirección de la Propiedad</h2>
      <p className="text-sm text-gray-500 mb-6">Ingresa la dirección y luego confirma o completa los detalles.</p>
      {/* Mensaje general de privacidad ELIMINADO de aquí */}

      <div className="space-y-4">
        {/* Autocompletado de Google (Visible) */}
        <div>
          <label htmlFor="googleAddressAutocomplete" className="block text-sm font-medium text-gray-700 mb-1">Buscar Dirección (Google)</label>
          <input 
            ref={addressInputRef} 
            type="text" 
            id="googleAddressAutocomplete" 
            defaultValue={formData.propertyFullAddress}
            onChange={handleGoogleAddressInputChange} 
            placeholder="Comienza a escribir la dirección..." 
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.propertyFullAddress ? 'border-red-500' : 'border-gray-300'}`} 
          />
          {errors.propertyFullAddress && <p className="text-red-500 text-xs mt-1">{errors.propertyFullAddress}</p>}
        </div>

        <hr className="my-6" />
        <p className="text-sm text-gray-600">Por favor, revisa y completa los siguientes detalles:</p>

        {/* Provincia (Desplegable - Visible) */}
        <div>
          <label htmlFor="propertyProvince" className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
          <select 
            id="propertyProvince" 
            name="propertyProvince" 
            value={formData.propertyProvince || ''} 
            onChange={handleLocalInputChange} 
            disabled={loadingProvinces} 
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.propertyProvince ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">{loadingProvinces ? 'Cargando...' : 'Selecciona provincia...'}</option>
            {provinces.map(p => (<option key={p.id || p.firestoreDocId} value={p.name}>{p.name}</option>))}
          </select>
          {errors.propertyProvince && <p className="text-red-500 text-xs mt-1">{errors.propertyProvince}</p>}
        </div>

        {/* Partido / Departamento (Desplegable - Visible) */}
        <div>
          <label htmlFor="propertyParty" className="block text-sm font-medium text-gray-700 mb-1">Partido / Departamento</label>
          <select 
            id="propertyParty" 
            name="propertyParty" 
            value={formData.propertyParty || ''} 
            onChange={handleLocalInputChange} 
            disabled={!selectedProvinceId || loadingParties} 
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.propertyParty ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">{loadingParties ? 'Cargando...' : (selectedProvinceId ? 'Selecciona partido...' : 'Selecciona una provincia primero')}</option>
            {parties.map(p => (<option key={p.id || p.firestoreDocId} value={p.name}>{p.name}</option>))}
          </select>
          {errors.propertyParty && <p className="text-red-500 text-xs mt-1">{errors.propertyParty}</p>}
        </div>

        {/* Localidad (Desplegable - Visible) */}
        <div>
          <label htmlFor="propertyLocality" className="block text-sm font-medium text-gray-700 mb-1">Localidad</label>
          <select 
            id="propertyLocality" 
            name="propertyLocality" 
            value={formData.propertyLocality || ''} 
            onChange={handleLocalInputChange} 
            disabled={!selectedPartyId || loadingLocalities} 
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.propertyLocality ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">{loadingLocalities ? 'Cargando...' : (selectedPartyId ? 'Selecciona localidad...' : 'Selecciona un partido primero')}</option>
            {localities.map(l => (<option key={l.id || l.firestoreDocId} value={l.name}>{l.name}</option>))}
          </select>
          {errors.propertyLocality && <p className="text-red-500 text-xs mt-1">{errors.propertyLocality}</p>}
        </div>
                
        {/* Calle (Input de Texto - VISIBLE Y EDITABLE) */}
        <div>
          <label htmlFor="propertyStreetName" className="block text-sm font-medium text-gray-700 mb-1">Calle</label>
          <input 
            type="text" 
            id="propertyStreetName" 
            name="propertyStreetName" 
            value={formData.propertyStreetName || ''} 
            onChange={handleLocalInputChange} 
            placeholder="Ej: Av. Corrientes" 
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.propertyStreetName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.propertyStreetName && <p className="text-red-500 text-xs mt-1">{errors.propertyStreetName}</p>}
        </div>

        {/* Altura, Piso, Depto (Inputs de Texto - VISIBLES) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
                <label htmlFor="propertyStreetNumber" className="block text-sm font-medium text-gray-700 mb-1">Altura (Nro)</label>
                <input 
                  type="text" 
                  id="propertyStreetNumber" 
                  name="propertyStreetNumber" 
                  value={formData.propertyStreetNumber || ''} 
                  onChange={handleLocalInputChange} 
                  placeholder="Ej: 1234" 
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm ${errors.propertyStreetNumber ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.propertyStreetNumber && <p className="text-red-500 text-xs mt-1">{errors.propertyStreetNumber}</p>}
            </div>
            <div>
                <label htmlFor="propertyFloor" className="block text-sm font-medium text-gray-700 mb-1">Piso <span className="text-xs text-gray-500">(Opcional)</span></label>
                <input 
                  type="text" 
                  id="propertyFloor" 
                  name="propertyFloor" 
                  value={formData.propertyFloor || ''} 
                  onChange={handleLocalInputChange} 
                  placeholder="Ej: 3, PB" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="propertyApartment" className="block text-sm font-medium text-gray-700 mb-1">Depto <span className="text-xs text-gray-500">(Opcional)</span></label>
                <input 
                  type="text" 
                  id="propertyApartment" 
                  name="propertyApartment" 
                  value={formData.propertyApartment || ''} 
                  onChange={handleLocalInputChange} 
                  placeholder="Ej: B, 2" 
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
            </div>
        </div>
        
        {/* Barrio (Input de Texto - VISIBLE Y EDITABLE) */}
        <div>
          <label htmlFor="propertyNeighborhood" className="block text-sm font-medium text-gray-700 mb-1">Barrio (Si no se autocompletó, ingrésalo)</label>
          <input 
            type="text" 
            id="propertyNeighborhood" 
            name="propertyNeighborhood" 
            value={formData.propertyNeighborhood || ''} 
            onChange={handleLocalInputChange} 
            placeholder="Ej: Palermo, Villa Crespo" 
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" 
          />
        </div>

        {/* ***** MENSAJE DE PRIVACIDAD MOVIDO AL FINAL DE LOS CAMPOS DE ESTE COMPONENTE ***** */}
        <p className="text-xs text-gray-500 mt-6 pt-4 px-1 italic border-t border-gray-200">
          La dirección detallada (calle, altura, piso, depto.) nos ayuda a crear rankings más precisos y no será visible públicamente en tu calificación.
        </p>
        {/* ***** FIN DEL MENSAJE ***** */}

      </div>
    </div>
  );
};

export default AddressStep;