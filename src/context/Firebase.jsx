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
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Create Firebase context
const FirebaseContext = createContext(null);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCldiFewMHWXrDiu0GZasHOvYQ5W3s_RJM",
  authDomain: "bookify-41932.firebaseapp.com",
  projectId: "bookify-41932",
  storageBucket: "bookify-41932.appspot.com",
  messagingSenderId: "1019345529068",
  appId: "1:1019345529068:web:fd07ffb97b82e36b0e5dc9",
  measurementId: "G-E2B850NYWE",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

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

  const addBook = async (name, number, url, price) => {
    const imgRef = ref(storage, `uploads/images/${Date.now()}-${url.name}`);
    const uploadResult = await uploadBytes(imgRef, url);
    return await addDoc(collection(fireStore, "books"), {
      name,
      number,
      price,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
    });
  };
  console.log(user);

  const isLoggedIn = user ? true : false;

  const signiWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
  return (
    <FirebaseContext.Provider
      value={{ register, login, signiWithGoogle, isLoggedIn ,addBook}}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
