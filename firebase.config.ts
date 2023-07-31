import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_REFLIX_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_REFLIX_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_REFLIX_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_REFLIX_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_REFLIX_MESSAGING_SENDER,
  appId: process.env.NEXT_PUBLIC_REFLIX_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
