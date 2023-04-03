import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDpNrONqU7J_jE2rvDAiT23-xAUOUv7wEA",
  authDomain: "corny-chat-v2.firebaseapp.com",
  projectId: "corny-chat-v2",
  storageBucket: "corny-chat-v2.appspot.com",
  messagingSenderId: "1027648655107",
  appId: "1:1027648655107:web:c7c2c5eb5cda2ebb19e336",
  measurementId: "G-E8XWPHRJKK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
export const googleProvider = new GoogleAuthProvider(app);
export const facebookProvider = new FacebookAuthProvider(app);
