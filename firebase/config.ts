import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";



const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseCredentials);
}




export const FireBase = firebase;

// Initialize Cloud Firestore and get a reference to the service
export const fDb = firebase.firestore();
export const fStore = firebase.storage();
export const fAuth = firebase.auth();



export const saveJson = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
}

export const getJson = <T = any>(key: string): null | T => {
  const data = localStorage.getItem(key);
  return !data ? null : JSON.parse(data);
}

export type UserCredential = firebase.User;