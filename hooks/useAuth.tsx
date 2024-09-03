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

  // Ceci est la route par defaut
  const redirectToDashboard = () => {
    router.push("/dashboard");
  };

  // La connection de l'utilisateur avec google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      setUser(result.user);
      redirectToDashboard();
    } catch (error) {
      console.log(`google : ${error}`);
    }
  };

  // La connection de l'utilisateur avec github
  const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, providerGithub);
      setUser(result.user);
      redirectToDashboard();
    } catch (error) {
      console.log(`github : ${error}`);
    }
  };

  // La gestion du changement d'etat de l'utilisateur
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

  // Une fonction pour rediriger l'utilisateur si il est dejas connecter
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
