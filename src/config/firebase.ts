// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getResult, SaveResults } from "../types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3OK-TRXupo1qTjPnsEHhUkz0uqZ0PSwg",
  authDomain: "web-prueba-ccse.firebaseapp.com",
  projectId: "web-prueba-ccse",
  storageBucket: "web-prueba-ccse.firebasestorage.app",
  messagingSenderId: "180029201868",
  appId: "1:180029201868:web:3161c5fda5116f22f51169",
  measurementId: "G-PG7N58VQCQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore();

//Función para guardar resultados de Test.

export const saveResultsTest = async ({ testId, score, answers, duration }: SaveResults) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const result = {
      userId: user.uid,
      testId,
      Date: new Date(),
      score,
      answers,
      duration,
    }

    //Guardar en FireStore
    const docRef = await addDoc(collection(db, 'users', user.uid, 'resultados'), result);
    return docRef.id;

  } catch (error) {
    console.error('Error al guardar resultado:', error)
    throw error;
  }
};

//Función para obtener todos los resultados de un usuario. 

export const getUserResults = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const q = query(
      collection(db, 'results'),
      where('userId', '==', user.uid)
    );

    const querySnapshot = await getDocs(q);
    const results = [];

    for (const document of querySnapshot.docs) {

      const docRef = doc(db, 'tests', document.data().testId);
      const testDoc = await getDoc(docRef);

      results.push({
        id: document.id,
        ...document.data(),
        test: testDoc.exists() ? { id: testDoc.id, ...testDoc.data() } : null,
        fecha: document.data().fecha.toDate(),
        duration: document.data().duration,
      });
    }

    return results.sort((a, b) => b.fecha - a.fecha);
  } catch (error) {
    console.error("Error al obtener resultados:", error);
    throw error;
  }
};


//Función obtener detalles de un resultado
export const getDetailsResult = async (resultId: string) => {
  try {
    const docRef = doc(db, 'results', resultId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Resultado no encontrado");
    }

    const result: getResult = {
      id: docSnap.id,
      ...docSnap.data(),
      fecha: docSnap.data().fecha.toDate()
    }

    //Obtener detalles del test.

    if (result.testId) {
      const testDoc = await getDoc(doc(db, 'tests', result.testId));
      if (testDoc.exists()) {
        result.test = {
          id: testDoc.id,
          ...testDoc.data()
        };
      }
    }

    return result;
  } catch (error) {
    console.error('Error al obtener detalle del resultado:', error);
    throw error;
  }
}