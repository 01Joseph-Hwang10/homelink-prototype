// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCEGrLZmkhEXmflbYB9H2Ys6V5nexfGxl0',
  authDomain: 'homelink-387706.firebaseapp.com',
  projectId: 'homelink-387706',
  storageBucket: 'homelink-387706.appspot.com',
  messagingSenderId: '68736588829',
  appId: '1:68736588829:web:6ee19ca5f1985a08f03af4',
  measurementId: 'G-C15R99FKND',
};

// Initialize Firebase
export const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const isDev = import.meta.env.DEV;
  if (isDev) {
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
    connectAuthEmulator(getAuth(), 'http://localhost:9099');
    connectStorageEmulator(getStorage(), 'localhost', 9199);
    connectFunctionsEmulator(getFunctions(), 'localhost', 5001);
  }
  return app;
};
