
'use server';

import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads a file to Firebase Storage and returns its public URL.
 * @param file The file to upload.
 * @param path The path in Firebase Storage where the file will be stored.
 * @returns The public download URL of the uploaded file.
 */
export async function uploadFile(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}
