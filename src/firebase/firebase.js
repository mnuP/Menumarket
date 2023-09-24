// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import {getFirestore, collection, getDocs} from 'firebase/firestore';

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
export const db = getFirestore(app);
export const storage = getStorage(app);

//functions

export async function logout() {
  await auth.signOut();
}

export async function getTodosCard(){
  try {
    const refDocs = collection(db,"usersPrincipal");
    const allDocs = await getDocs(refDocs);

    const eachDoc = [];
  
    allDocs.forEach((doc) => {
      eachDoc.push({id: doc.id, titulo: doc.data().titulo, tiempo: doc.data().tiempo, foto: doc.data().foto});
    });

    return eachDoc;

  } catch (error) {
    console.error("erro al obtener los documentos: ", error);
  }
}  