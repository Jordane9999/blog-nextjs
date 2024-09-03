"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/db/configFirebase";
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "firebase/auth";

const providerGithub = new GithubAuthProvider();
const providerGoogle = new GoogleAuthProvider();

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isFetch, setIsFetch] = useState(true);

  const router = useRouter();

  const redirectToDashboard = () => {
    router.push("/dashboard");
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      setUser(result.user);
      redirectToDashboard();
    } catch (error) {
      console.log(`google : ${error}`);
    }
  };

  const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, providerGithub);
      setUser(result.user);
      redirectToDashboard();
    } catch (error) {
      console.log(`github : ${error}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsFetch(false);
    });
    return () => unsubscribe();
  }, []);

  const redirectIfAuthenticated = () => {
    if (user) {
      redirectToDashboard();
    }
  };

  return {
    user,
    isFetch,
    redirectIfAuthenticated,
    loginWithGithub,
    loginWithGoogle
  };
}
