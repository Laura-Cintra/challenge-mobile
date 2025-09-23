// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { getReactNativePersistence } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyAvjGEFbJyNJjy0nLt0Pq5NHfKnjGZ5b5c",
  authDomain: "challenge-smartpatio.firebaseapp.com",
  projectId: "challenge-smartpatio",
  storageBucket: "challenge-smartpatio.firebasestorage.app",
  messagingSenderId: "52950126345",
  appId: "1:52950126345:web:1d7f7123b6677143ea0dd8"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };