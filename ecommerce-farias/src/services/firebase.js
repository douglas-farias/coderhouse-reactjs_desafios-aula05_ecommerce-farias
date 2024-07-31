// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs, addDoc, query, where, limit } from "firebase/firestore";
// import { ItemCollection } from "./ItemCollection";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2G5f1OfeUEPnF3Oqn0BWl9gG_mDfivB4",
  authDomain: "ecommerce-farias.firebaseapp.com",
  projectId: "ecommerce-farias",
  storageBucket: "ecommerce-farias.appspot.com",
  messagingSenderId: "834765971231",
  appId: "1:834765971231:web:6a029c1348018814eb1a2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;

// ItemCollection.forEach(async(obj) => {

//   const docRef = await addDoc(collection(db, "ItemCollection"), obj);

//   console.log("Document written with ID: ", docRef.id);

// });

