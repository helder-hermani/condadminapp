// Import the functions you need from the SDKs you need 
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA9gnV-C8s649ZlFHVPWA7d8UeLlHV1dM",
  authDomain: "adm-rio-jordao-jp.firebaseapp.com",
  projectId: "adm-rio-jordao-jp",
  storageBucket: "adm-rio-jordao-jp.appspot.com",
  messagingSenderId: "810161868774",
  appId: "1:810161868774:web:7c506cc207f48278bf1027"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);


// import firebase from 'firebase/app';
// import 'firebase/storage';

// // // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APP_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

// // // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const storage = firebase.storage();