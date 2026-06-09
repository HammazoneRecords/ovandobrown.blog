
'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged, 
    User, 
    signOut, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsAuthLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast({ title: "Sign-in Error", description: "Could not sign in with Google.", variant: "destructive" });
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleEmailSignUp = async (email: string, password: string) => {
    setIsAuthLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({ title: "Success", description: "Account created successfully! You are now signed in." });
    } catch(error: any) {
      console.error("Email sign-up error", error);
      toast({ title: "Sign-up Error", description: error.message, variant: "destructive" });
    } finally {
        setIsAuthLoading(false);
    }
  }

  const handleEmailSignIn = async (email: string, password: string) => {
    setIsAuthLoading(true);
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error: any) {
        console.error("Email sign-in error", error);
        toast({ title: "Sign-in Error", description: error.message, variant: "destructive" });
    } finally {
      setIsAuthLoading(false);
    }
  }

  const handleSignOut = async () => {
    setIsAuthLoading(true);
    try {
        await signOut(auth);
    } catch(error: any) {
        console.error("Sign-out error", error);
        toast({ title: "Sign-out Error", description: "Could not sign out.", variant: "destructive" });
    } finally {
        setIsAuthLoading(false);
    }
  };

  return {
    user,
    isLoading,
    isAuthLoading,
    handleGoogleSignIn,
    handleEmailSignUp,
    handleEmailSignIn,
    handleSignOut,
  }
}
