import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  initializeAuth,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const GOOGLE_CLIENT_IDS = {
  expoClientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
  iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
  androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
  webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com"
};

export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith("YOUR_");

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

let authInstance;
try {
  // React Native needs explicit AsyncStorage persistence for durable login sessions.
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch {
  authInstance = getAuth(app);
}

export const auth = authInstance;
export const db = getFirestore(app);

export const subscribeToAuth = (callback) => onAuthStateChanged(auth, callback);

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email.trim(), password);

export const signupWithEmail = async (name, email, password) => {
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  // Firebase Auth stores displayName separately from the Firestore user profile.
  await updateProfile(credential.user, { displayName: name.trim() });
  return credential;
};

export const loginWithGoogleCredential = (idToken) => {
  const credential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(auth, credential);
};

export const logout = () => signOut(auth);
