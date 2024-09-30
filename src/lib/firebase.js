
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGlxwGM9o3RNujcHRryvaBwS7BqJbE8zc",
  authDomain: "reactchat-3ea71.firebaseapp.com",
  projectId: "reactchat-3ea71",
  storageBucket: "reactchat-3ea71.appspot.com",
  messagingSenderId: "565554908133",
  appId: "1:565554908133:web:78145fb4571440b313fd0c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
