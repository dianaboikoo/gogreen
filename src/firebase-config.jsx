// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVViobb5Z22KIcruf9n1tAFjUbPOiSFKM",
  authDomain: "gogreen-b1a47.firebaseapp.com",
  databaseURL: "https://gogreen-b1a47-default-rtdb.firebaseio.com",
  projectId: "gogreen-b1a47",
  storageBucket: "gogreen-b1a47.firebasestorage.app",
  messagingSenderId: "792562719469",
  appId: "1:792562719469:web:8eb962418c71a854728ae4",
  measurementId: "G-0BHQ86N083"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);