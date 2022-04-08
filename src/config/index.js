// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBYBpWPa4WaviuNwn8zfYuf2Wa-zzGohtg",
  authDomain: "jamr-app.firebaseapp.com",
  projectId: "jamr-app",
  storageBucket: "jamr-app.appspot.com",
  messagingSenderId: "452375856317",
  appId: "1:452375856317:web:44af9bdd0920d8f25c63d4",
  measurementId: "G-ZGH31KDQS9",
};

firebase.initializeApp(firebaseConfig);
const auth = getAuth();
export { auth };
export const authentication = getAuth();

// Firebase setup new
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth, PhoneAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBYBpWPa4WaviuNwn8zfYuf2Wa-zzGohtg",
//   authDomain: "jamr-app.firebaseapp.com",
//   projectId: "jamr-app",
//   storageBucket: "jamr-app.appspot.com",
//   messagingSenderId: "452375856317",
//   appId: "1:452375856317:web:44af9bdd0920d8f25c63d4",
//   measurementId: "G-ZGH31KDQS9",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth();
// const phoneAuthProvider = PhoneAuthProvider;

// export { db, auth, phoneAuthProvider };
