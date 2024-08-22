// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgI2hhFMT3xsStzIB7YylX6R-qWuMlI3k",
  authDomain: "canari-e0bb6.firebaseapp.com",
  projectId: "canari-e0bb6",
  storageBucket: "canari-e0bb6.appspot.com",
  messagingSenderId: "641829464053",
  appId: "1:641829464053:web:c3ebf8a81a202ea4f722bc",
  measurementId: "G-1BRZQFRDQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
