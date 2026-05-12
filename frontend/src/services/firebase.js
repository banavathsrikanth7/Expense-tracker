// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiVs8iprj5lpMfU4sUlTQ_pwO5XDTnTcY",
  authDomain: "expense-tracker-82bb0.firebaseapp.com",
  projectId: "expense-tracker-82bb0",
  storageBucket: "expense-tracker-82bb0.firebasestorage.app",
  messagingSenderId: "624985463760",
  appId: "1:624985463760:web:d1af5c3db5ec147444b7d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);