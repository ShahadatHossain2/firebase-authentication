// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyy7lJiEzBTCmMTD1_dN3YcbzlCkwnKpE",
  authDomain: "fir-authentication-d6a08.firebaseapp.com",
  projectId: "fir-authentication-d6a08",
  storageBucket: "fir-authentication-d6a08.firebasestorage.app",
  messagingSenderId: "369130503318",
  appId: "1:369130503318:web:eef2a7e34a2988306a56b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);