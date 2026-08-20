// Firebase initialization
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBSM4wbELUEOsQkTOHI8yOYSohTdiHTm1k",
  authDomain: "my-portfolio-78a8f.firebaseapp.com",
  projectId: "my-portfolio-78a8f",
  storageBucket: "my-portfolio-78a8f.firebasestorage.app",
  messagingSenderId: "369248423127",
  appId: "1:369248423127:web:641a608a11835fcee63492",
  measurementId: "G-6NR5YQZZFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // analytics can fail in non-browser environments (SSR) — ignore safely
  analytics = null;
}

export { app, analytics };
