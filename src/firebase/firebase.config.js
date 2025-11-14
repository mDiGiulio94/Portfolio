// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9ZMuSdMF8vboz9jYi2IuUr3IW4HhG_9k",
  authDomain: "portfolio-38468.firebaseapp.com",
  databaseURL: "https://portfolio-38468-default-rtdb.firebaseio.com",
  projectId: "portfolio-38468",
  storageBucket: "portfolio-38468.firebasestorage.app",
  messagingSenderId: "471810985234",
  appId: "1:471810985234:web:e99bcfd729c63471ca37cb",
  measurementId: "G-2K2G2CR1KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);