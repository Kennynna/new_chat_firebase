// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBK4eA3GdCMcmW1s4LN0Zw6ZB-A9lfG1pM",
  authDomain: "online-chat-2e2fc.firebaseapp.com",
  projectId: "online-chat-2e2fc",
  storageBucket: "online-chat-2e2fc.firebasestorage.app",
  messagingSenderId: "1031456435878",
  appId: "1:1031456435878:web:080f2f091fc60699468e67",
  measurementId: "G-THBRYQFR79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
