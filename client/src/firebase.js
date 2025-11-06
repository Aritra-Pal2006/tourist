// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzbuRCqFhws8sN3Pm6JFGZMQsQc-Ksf0Y",
  authDomain: "tourist-35514.firebaseapp.com",
  projectId: "tourist-35514",
  storageBucket: "tourist-35514.firebasestorage.app",
  messagingSenderId: "547846362635",
  appId: "1:547846362635:web:5da74d2ab1172b330ad90e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app;