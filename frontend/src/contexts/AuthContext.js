// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserProfile({ uid: user.uid, ...docSnap.data() });
        } else {
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    // NO exportamos ninguna función de refresco. Lo haremos más simple.
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}