import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, providerGoogle } from "../firebase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginGoogle = async () => {
    await signInWithPopup(auth, providerGoogle);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return {
    user,
    authLoading,
    loginGoogle,
    logout
  };
}