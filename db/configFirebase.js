import { initializeApp } from "firebase/app";

// getyFirestore nous permet d'acceder as notre base de donner
import { getFirestore } from "firebase/firestore";

// getStorage nous permet d'acceder au stokage de notre application sur firebase
import { getStorage } from "firebase/storage";

// getStorage nous permet d'acceder a l'authentification de notre application sur firebase
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialisation de notre application avec firebase
export const app = initializeApp(firebaseConfig);

// cette variable nous permet de nous connetter as la base de donner
export const db = getFirestore(app);

// Cette variable nous permet de fait de l'authentification
export const auth = getAuth(app);

// Cette variable nous permet d'avoire acces au resource image dans firebase
export const storage = getStorage(app);
