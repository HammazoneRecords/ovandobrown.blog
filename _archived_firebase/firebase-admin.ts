
import admin from 'firebase-admin';

// Ensure the SDK is initialized only once
if (admin.apps.length === 0) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('FIREBASE_PRIVATE_KEY is not set');
    }

    const credential = admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // The private key must be parsed correctly.
        privateKey: privateKey.replace(/\\n/g, '\n'),
    });
    
    admin.initializeApp({
      credential,
    });
  } catch (error) {
    console.error("Firebase admin initialization error:", error);
  }
}

/**
 * Gets a firestore db instance that is guaranteed to be initialized.
 */
export const getAdminDb = () => {
    if(admin.apps.length === 0) {
        throw new Error("Firebase Admin SDK not initialized");
    }
    return admin.firestore();
};


/**
 * Gets a auth instance that is guaranteed to be initialized.
 */
export const getAdminAuth = () => {
    if(admin.apps.length === 0) {
        throw new Error("Firebase Admin SDK not initialized");
    }
    return admin.auth();
};
