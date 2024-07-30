// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlPySgzWZNJXpv7ypyYYFL71Je2KH-97M",
  authDomain: "desafio-firebase-511c8.firebaseapp.com",
  projectId: "desafio-firebase-511c8",
  storageBucket: "desafio-firebase-511c8.appspot.com",
  messagingSenderId: "308730370435",
  appId: "1:308730370435:web:ea907dff8c1be4affcfeb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app