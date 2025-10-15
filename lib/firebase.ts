import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK only if credentials are available
// This allows the build to succeed even without .env.local
let db: ReturnType<typeof getFirestore> | null = null;

function initializeFirebase() {
  if (getApps().length) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Only initialize if all credentials are present
  if (!projectId || !clientEmail || !privateKey) {
    console.warn('Firebase credentials not found. Skipping initialization.');
    return null;
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, "\n"),
    }),
  });
}

// Initialize on first import
const app = initializeFirebase();

// Only get Firestore if Firebase was initialized
if (app) {
  db = getFirestore();
}

// Export db - API routes should check if it's null
export { db };

// Collection names
export const COLLECTIONS = {
  REGISTRATION_LINKS: "registration_links",
  REGISTRATIONS: "registrations",
};
