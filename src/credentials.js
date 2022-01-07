// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjB1qe6EW2HE-fnIdtFvEkuvznpJOFJdo",
  authDomain: "fb9crud.firebaseapp.com",
  projectId: "fb9crud",
  storageBucket: "fb9crud.appspot.com",
  messagingSenderId: "463773933064",
  appId: "1:463773933064:web:37fce436dc6f6356c73bbd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp