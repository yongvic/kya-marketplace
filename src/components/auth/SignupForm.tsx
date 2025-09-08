"use client";

import React, { useState } from "react";
import { Input, Button } from "@heroui/react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";

export const SignUpForm = () => {
  const t = useTranslations("SignUpForm");
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
        throw new Error(errorData || t("creationError"));
      }

      // **UX Améliorée : Connexion automatique après inscription réussie**
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        redirect("/dashboard/user"); // Redirection vers le dashboard
      } else {
        throw new Error(result?.error || t("autoLoginError"));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("unexpectedError"));
      }
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
        label={t("fullNameLabel")}
        name="fullName"
        placeholder={t("fullNamePlaceholder")}
      />
      <Input
        isRequired
        label={t("emailLabel")}
        name="email"
        placeholder={t("emailPlaceholder")}
        type="email"
      />
      <Input
        isRequired
        label={t("passwordLabel")}
        name="password"
        placeholder={t("passwordPlaceholder")}
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
          {t("createAccountButton")}
        </Button>
      </div>
    </form>
  );
};
