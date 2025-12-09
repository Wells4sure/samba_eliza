// Firebase imports commented out - connection is DISABLED
// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";

// Firebase connection is DISABLED
// To re-enable, uncomment imports and initialization code below
let db: any = null;

function initializeFirebase() {
  // Firebase is disabled - always return null
  console.log('Firebase connection is disabled.');
  return null;

  // Commented out to disable Firebase initialization
  // if (getApps().length) {
  //   return getApps()[0];
  // }

  // const projectId = process.env.FIREBASE_PROJECT_ID;
  // const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // // Only initialize if all credentials are present
  // if (!projectId || !clientEmail || !privateKey) {
  //   console.warn('Firebase credentials not found. Skipping initialization.');
  //   return null;
  // }

  // return initializeApp({
  //   credential: cert({
  //     projectId,
  //     clientEmail,
  //     privateKey: privateKey.replace(/\\n/g, "\n"),
  //   }),
  // });
}

// Initialize on first import - will always be null with Firebase disabled
initializeFirebase();

// Only get Firestore if Firebase was initialized (will be skipped)
// if (app) {
//   db = getFirestore();
// }

// Export db - API routes should check if it's null
export { db };

// Collection names
export const COLLECTIONS = {
  REGISTRATION_LINKS: "registration_links",
  REGISTRATIONS: "registrations",
};
