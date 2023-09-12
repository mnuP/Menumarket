// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getStorage, ref, uploadBytes, getDownloadURL, getBytes} from 'firebase/storage';
import {getFirestore, collection, addDoc, getDocs, doc, getDOc, query, where, setDoc, deleteDoc} from 'firebase/firestore';

const firebaseConfig = {
  // we use env so its safer
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROYECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};

// Initialize firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
const dataBase = getFirestore(app);
const storage = getStorage(app);