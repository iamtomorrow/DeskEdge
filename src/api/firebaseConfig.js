
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyDhMHvZaKiAuCXwNEiK0E28wRTCAlY-9hc",
  authDomain: "deskedge-e5030.firebaseapp.com",
  projectId: "deskedge-e5030",
  storageBucket: "deskedge-e5030.appspot.com",
  messagingSenderId: "686621404327",
  appId: "1:686621404327:web:47eae169ec77cf3f8dff82",
  measurementId: "G-6PHP0ST7YR"
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
