
'use server';

import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy } from 'firebase/firestore';

export type Comment = {
  id: string;
  author: string;
  authorImage: string;
  text: string;
  timestamp: any;
};

export type NewComment = Omit<Comment, 'id' | 'timestamp'>;

// Get all comments for a specific post slug
export async function getComments(postSlug: string): Promise<Comment[]> {
  const commentsCol = collection(db, 'comments');
  const q = query(
      commentsCol, 
      where('postSlug', '==', postSlug),
      orderBy('timestamp', 'desc')
    );

  const querySnapshot = await getDocs(q);
  const comments = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      timestamp: data.timestamp.toDate(),
    } as Comment;
  });

  return comments;
}

// Add a new comment to a post
export async function addComment(postSlug: string, comment: NewComment): Promise<string> {
    const commentsCol = collection(db, 'comments');
    const docRef = await addDoc(commentsCol, {
        ...comment,
        postSlug: postSlug,
        timestamp: serverTimestamp() // Use server-side timestamp
    });
    return docRef.id;
}
