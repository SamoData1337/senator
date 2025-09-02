// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyz5TIT5xaY7OPG5L4AGQAlUufpOrYoMw",
  authDomain: "senator-skrine.firebaseapp.com",
  projectId: "senator-skrine",
  storageBucket: "senator-skrine.firebasestorage.app",
  messagingSenderId: "907849393637",
  appId: "1:907849393637:web:e044091a67841794807b0c",
  measurementId: "G-8VRSEM8VKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Analytics
export const analytics = getAnalytics(app);

export default app;