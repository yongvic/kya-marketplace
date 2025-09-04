"use client";
import React from "react";
// Ce layout est très similaire à celui du dashboard utilisateur, mais pour les sous-onglets
import { Tabs, Tab } from "@heroui/react";
import { FaUserCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

// Ce composant sera client pour gérer la navigation
const SettingsNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    {
      key: "/dashboard/admin/settings",
      title: "Compte",
      icon: <FaUserCircle />,
    },
    // Ajoute d'autres sous-onglets ici à l'avenir
  ];

  return (
    <Tabs
      aria-label="Navigation des paramètres"
      selectedKey={pathname}
      onSelectionChange={(key) => router.push(key as string)}
      items={tabs}
      classNames={{
        base: "w-full md:w-64",
        tabList: "w-full flex-col h-auto",
        cursor: "w-full",
        tab: "w-full justify-start",
      }}>
      {(item) => (
        <Tab
          key={item.key}
          title={
            <div className="flex items-center space-x-2">
              {item.icon}
              <span>{item.title}</span>
            </div>
          }
        />
      )}
    </Tabs>
  );
};

export default function AdminSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside>
          <SettingsNavigation />
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
