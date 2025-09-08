// src/app/auth/page.tsx
"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  Tabs,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import type React from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Tu peux utiliser une librairie d'icônes comme react-icons
// npm install react-icons
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { SignUpForm } from "@/components/auth/SignupForm";

export default function AuthPage() {
  const [selected, setSelected] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations("AuthPage");

  const handleOAuthSignIn = (provider: "google") => {
    signIn(provider, {
      callbackUrl: "/fr/dashboard/user",
      prompt: "select_account",
    }); // Redirige vers le dashboard après connexion
  };

  const handleCredentialsSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // On gère la redirection manuellement
      });
      if (result?.ok) {
        router.push("/dashboard/user"); // Redirection vers le dashboard
      } else {
        // Gérer l'erreur (afficher un message, etc.)
        console.error("Failed to sign in:", result?.error);
        setError(result?.error || null);
      }
    } catch {
      setError(t("loginError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
      <Card className="max-w-full w-[400px]">
        <CardHeader className="flex flex-col items-center">
          <Image
            src="/kya-soldesign.png"
            alt="KYA-Sol Design pic"
            width={128}
            height={128}
            className="object-cover"
          />
          <h1 className="font-display text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-default-500">{t("subtitle")}</p>
        </CardHeader>
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            onSelectionChange={(key) => {
              setSelected(key as string);
              setError(null);
            }}
            selectedKey={selected}
            size="md">
            <Tab
              key="login"
              title={t("loginTab")}>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleCredentialsSubmit}>
                {error && (
                  <div className="p-2 text-center bg-danger-100 text-danger-700 rounded-md text-small">
                    {error}
                  </div>
                )}
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
                />
                <p className="text-center text-small">
                  {t("needAccount")}{" "}
                  <Button
                    size="sm"
                    variant="light"
                    className="cursor-pointer underline"
                    onClick={() => setSelected("sign-up")}>
                    {t("signupButton")}
                  </Button>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    color="primary"
                    fullWidth
                    isLoading={isLoading}
                    type="submit">
                    {t("loginButton")}
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab
              key="sign-up"
              title={t("signupTab")}>
              {/* Le formulaire d'inscription irait ici. Pour l'instant, on se concentre sur la connexion. */}
              <SignUpForm />
            </Tab>
          </Tabs>
          <div className="flex items-center gap-4 my-4">
            <hr className="flex-grow border-t border-default-200" />
            <span className="text-xs text-default-500">{t("or")}</span>
            <hr className="flex-grow border-t border-default-200" />
          </div>
          <Button
            fullWidth
            onPress={() => handleOAuthSignIn("google")}
            startContent={<FcGoogle size={20} />}
            variant="bordered">
            {t("googleButton")}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}