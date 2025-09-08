import { Avatar, Button, Chip } from "@heroui/react";
import type React from "react";
import TabNavigation from "@/components/dashboard/user/TabNavigation";
import { getTranslations } from "next-intl/server";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("DashboardUser.productLayout");
  return (
    <div className="p-4 md:p-8">
      {/* 1. Header du Produit */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Avatar
            size="lg"
            src="/kya-soldesign.png"
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("title")}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Chip
            color="success"
            variant="flat">
            {t("latestVersion")}
          </Chip>
        </div>
      </header>

      {/* 2. Barre de Navigation par Onglets */}

      <TabNavigation />

      {/* 3. Contenu de l'onglet (la page active) */}
      <main className="mt-6">{children}</main>
    </div>
  );
}
