import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAiAr0RoRsK-eVi5h1rLgICoKLgWSE41yY",
    authDomain: "halal-dining-uk.firebaseapp.com",
    projectId: "halal-dining-uk",
    storageBucket: "halal-dining-uk.appspot.com",
    messagingSenderId: "589257054020",
    appId: "1:589257054020:web:b834d65dcdc5d6109a2911",
    measurementId: "G-ZWQWX7FNDP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
var analytics;

if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, analytics };
