// src/utils/firebase.js

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, // Lo importas aquí
  sendEmailVerification,          // Lo importas aquí
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getRedirectResult,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp, // Ya lo tienes
  collection,      // <--- Añadir
  getDocs,         // <--- Añadir
  query,           // <--- Añadir
  where,           // <--- Añadir
  //orderBy,         // <--- Añadir (si lo necesitas para ordenar)
  //limit            // <--- Añadir (si lo necesitas para paginación o top N)
} from "firebase/firestore";

// Configuración usando variables de entorno
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("✅ Firebase auth persistence set to local");
  })
  .catch((error) => {
    console.error("❌ Error setting persistence:", error);
  });

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider(); // No la usas aún, pero está definida
const appleProvider = new OAuthProvider('apple.com'); // No la usas aún, pero está definida

// Email link settings (si planeas usar "magic links" para login)
const actionCodeSettings = {
  url: process.env.REACT_APP_LOGIN_REDIRECT_URL || 'http://localhost:3000/login', // Usa variable de entorno o un default
  handleCodeInApp: true
};

// Función para crear perfil de usuario en Firestore
const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, `users/${userAuth.uid}`);
  const createdAt = serverTimestamp(); 

  const {
    firstName, lastName, phone, address, streetNumber,
    floorApartment, city, propertyType, userType, notifications
  } = additionalData;

  try {
    await setDoc(userRef, {
      uid: userAuth.uid,
      email: userAuth.email,
      firstName: firstName || '',
      lastName: lastName || '',
      displayName: `${firstName || ''} ${lastName || ''}`.trim(),
      phone: phone || '',
      address: address || '',
      streetNumber: streetNumber || '',
      floorApartment: floorApartment || '',
      city: city || '',
      propertyType: propertyType || '',
      userType: userType || 'inquilino',
      notifications: typeof notifications === 'boolean' ? notifications : true,
      photoURL: userAuth.photoURL || '',
      createdAt,
      updatedAt: createdAt,
      // Nuevos campos de dirección desglosada si los tienes en additionalData y los quieres guardar en el perfil de usuario
      // propertyStreetName: additionalData.propertyStreetName || '',
      // propertyProvince: additionalData.propertyProvince || '',
      // propertyPostalCode: additionalData.propertyPostalCode || '',
      // propertyNeighborhood: additionalData.propertyNeighborhood || '',
    });
    console.log("✅ Perfil de usuario creado/actualizado en Firestore");
  } catch (error) {
    console.error("❌ Error creando el perfil de usuario en Firestore:", error);
    throw error;
  }
};

export const getProvinces = async () => {
  const provincesCol = collection(db, 'provinces');
  const provinceSnapshot = await getDocs(provincesCol);
  const provinceList = provinceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // Asumimos que la colección 'provinces' tiene un campo 'name' para mostrar.
  // Podrías querer ordenarlas por nombre:
  // provinceList.sort((a, b) => a.name.localeCompare(b.name));
  return provinceList;
};

/**
 * Obtiene los partidos/departamentos de una provincia específica.
 * @param {string} provinceId - El ID de la provincia.
 */
export const getPartiesByProvince = async (provinceId) => {
  if (!provinceId) return [];
  const partiesCol = collection(db, 'parties');
  const q = query(partiesCol, where('provinceId', '==', provinceId));
  const partySnapshot = await getDocs(q);
  const partyList = partySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // partyList.sort((a, b) => a.name.localeCompare(b.name)); // Opcional: ordenar
  return partyList;
};

/**
 * Obtiene las localidades de un partido/departamento específico.
 * @param {string} partyId - El ID del partido.
 */
export const getLocalitiesByParty = async (partyId) => {
  if (!partyId) return [];
  const localitiesCol = collection(db, 'localities');
  // El campo en tu estructura es 'partiesid', asegúrate que coincida aquí.
  const q = query(localitiesCol, where('partiesid', '==', partyId));
  const localitySnapshot = await getDocs(q);
  const localityList = localitySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // localityList.sort((a, b) => a.name.localeCompare(b.name)); // Opcional: ordenar
  return localityList;
};

// --- Funciones para obtener datos para Rankings ---

/**
 * Obtiene los datos de referencia de mercado para una localidad específica.
 * Asume que provinceId, partyId y localtiesId juntos identifican una entrada única o un conjunto pequeño.
 * @param {string} provinceId
 * @param {string} partyId
 * @param {string} localityId - Usando 'localtiesId' como mencionaste.
 */
export const getMarketDataForLocality = async (provinceId, partyId, localityId) => {
  if (!provinceId || !partyId || !localityId) return null; // o un array vacío si esperas múltiples

  const marketRef = collection(db, 'marketReferenceData');
  const q = query(marketRef,
    where('provinceId', '==', provinceId),
    where('partiesId', '==', partyId), // Asegúrate que el nombre del campo sea exacto
    where('localtiesId', '==', localityId) // Usando 'localtiesId'
  );

  const querySnapshot = await getDocs(q);
  const marketDataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Si esperas solo un documento de referencia por esta combinación:
  // return marketDataList.length > 0 ? marketDataList[0] : null;
  // Si pueden ser varios (ej. por pricePropertyType):
  return marketDataList;
};

/**
 * Obtiene todas las reviews para una localidad específica.
 * ASUNCIÓN CLAVE: Que las reviews tienen campos como 'provinceId', 'partyId', 'localityId'.
 * Si no, esta función necesitará adaptarse para filtrar por nombres y sería más compleja.
 * @param {string} provinceId
 * @param {string} partyId
 * @param {string} localityId - El ID de la localidad de la colección 'localities'.
 */
export const getReviewsForLocality = async (provinceId, partyId, localityId) => {
  if (!provinceId || !partyId || !localityId) return [];

  const reviewsCol = collection(db, 'reviews');
  // TODO: Confirmar los nombres exactos de los campos de ID en la colección 'reviews'
  // Por ejemplo, podrían ser: reviewProvinceId, reviewPartyId, reviewLocalityId
  const q = query(reviewsCol,
    where('isApproved', '==', true), // Solo reviews aprobadas
    // where('isArchived', '==', false), // Si tienes archivado y no quieres incluirlas
    where('propertyProvinceId', '==', provinceId),   // CAMBIAR 'propertyProvinceId' al nombre real del campo en 'reviews'
    where('propertyPartyId', '==', partyId),      // CAMBIAR 'propertyPartyId' al nombre real del campo en 'reviews'
    where('propertyLocalityId', '==', localityId) // CAMBIAR 'propertyLocalityId' al nombre real del campo en 'reviews'
    // Podrías querer añadir un orderBy('createdAt', 'desc') si es relevante
  );

  const reviewSnapshot = await getDocs(q);
  const reviewList = reviewSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return reviewList;
};


// --- Fin de nuevas funciones ---

export {
  auth,
  storage,
  db,
  // ... (tus exportaciones existentes)
  createUserProfileDocument,
  doc,
  setDoc,
  serverTimestamp,
  collection, // <--- Exportar para uso general si es necesario
  getDocs,    // <--- Exportar para uso general si es necesario
  query,      // <--- Exportar para uso general si es necesario
  where,      // <--- Exportar para uso general si es necesario
  // Nuevas funciones exportadas:
  //getProvinces,
  //getPartiesByProvince,
  //getLocalitiesByParty,
  //getMarketDataForLocality,
  //getReviewsForLocality
};

export {
  //auth,
  //storage,
  //db,
  ref, // de firebase/storage
  uploadBytes, // de firebase/storage
  getDownloadURL, // de firebase/storage
  googleProvider,
  facebookProvider, // Aunque no la uses, la exportas por si acaso
  appleProvider,    // Aunque no la uses, la exportas por si acaso
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword, // Re-exportado
  sendEmailVerification,          // <--- RE-EXPORTADO
  sendSignInLinkToEmail,          // Para magic links
  isSignInWithEmailLink,          // Para magic links
  signInWithEmailLink,            // Para magic links
  actionCodeSettings,             // Para magic links
  getRedirectResult,              // Para flujos de redirección de login
  //createUserProfileDocument,      // Tu función personalizada
  //doc,                            // de firebase/firestore (útil para otros archivos)
  //setDoc,                         // de firebase/firestore (útil para otros archivos)
  //serverTimestamp                 // de firebase/firestore (útil para otros archivos)
};