// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvPnG3aQxCR8OuEkhISnn_jOak8y2nq0Y",
  authDomain: "exam-web-749cd.firebaseapp.com",
  databaseURL: "https://exam-web-749cd-default-rtdb.asia-southeast1.firebasedatabase.app", // Add your database URL
  projectId: "exam-web-749cd",
  storageBucket: "exam-web-749cd.appspot.com",
  messagingSenderId: "194373268796",
  appId: "1:194373268796:web:9f28a7ea9c980ee9c49a39",
  measurementId: "G-6R0C46VXQ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize Realtime Database

export { database };
