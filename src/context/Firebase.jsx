import { useContext, createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// Create Firebase context
const FirebaseContext = createContext(null);

// Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const isLoggedIn = user ? true : false;

  const signiWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
  return (
    <FirebaseContext.Provider
      value={{ register, login, signiWithGoogle, isLoggedIn }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
