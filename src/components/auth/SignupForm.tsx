"use client";

import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Appeler notre API d'inscription
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Échec de la création du compte.");
      }

      // **UX Améliorée : Connexion automatique après inscription réussie**
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        redirect("/dashboard"); // Redirection vers le dashboard
      } else {
        throw new Error(result?.error || "Connexion automatique échouée.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4">
      <Input
        isRequired
        label="Nom complet"
        name="fullName"
        placeholder="Entrez votre nom complet"
      />
      <Input
        isRequired
        label="Email"
        name="email"
        placeholder="Entrez votre email"
        type="email"
      />
      <Input
        isRequired
        label="Mot de passe"
        name="password"
        placeholder="8 caractères minimum"
        type="password"
        minLength={8}
      />
      {error && (
        <div className="p-2 text-center bg-danger-100 text-danger-700 rounded-md text-small">
          {error}
        </div>
      )}
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          color="primary"
          type="submit"
          isLoading={isLoading}>
          Créer mon compte
        </Button>
      </div>
    </form>
  );
};
