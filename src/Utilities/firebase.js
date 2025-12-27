// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import "firebase/compat/auth"
// import "firebase/compat/firestore"
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4lE_siDn-JGGVEnmYjdzC-TbVwPCsWw8",
  authDomain: "clone-2025-4d69f.firebaseapp.com",
  projectId: "clone-2025-4d69f",
  storageBucket: "clone-2025-4d69f.firebasestorage.app",
  messagingSenderId: "1052225175232",
  appId: "1:1052225175232:web:c482dab4908fa21d087725",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


