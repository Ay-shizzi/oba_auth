// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNieys0AmzthCUkcgKiax8WOW_q_O5KYI",
  authDomain: "oba-bank-authenticator.firebaseapp.com",
  projectId: "oba-bank-authenticator",
  storageBucket: "oba-bank-authenticator.appspot.com",
  messagingSenderId: "695036001592",
  appId: "1:695036001592:web:8367305e2ac4d11b4bd5cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
