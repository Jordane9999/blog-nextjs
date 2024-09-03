"use client";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

export default function signIn() {
  const { redirectIfAuthenticated, loginWithGoogle, loginWithGithub } =
    useAuth();

  redirectIfAuthenticated();
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2">
      <Button type="button" variant="outline" onClick={loginWithGoogle}>
        Continuer avec Google
      </Button>
      <Button type="button" variant="outline" onClick={loginWithGithub}>
        Continuer avec Github
      </Button>
    </section>
  );
}
