"use client";
import { Tabs, Tab } from "@heroui/react";
import { redirect, usePathname } from "next/navigation";
import { FaCog, FaDesktop, FaDownload, FaHome, FaKey } from "react-icons/fa";

export default function TabNavigation() {
  const pathname = usePathname();

  // Détermine l'onglet actif à partir de l'URL
  const currentTab = pathname.split("/").pop();

  const tabs = [
    {
      href: `/dashboard/user`,
      key: "overview",
      title: "Vue d'ensemble",
      icon: <FaHome />,
    },
    {
      href: `/dashboard/user/downloads`,
      key: "downloads",
      title: "Téléchargements",
      icon: <FaDownload />,
    },
    {
      href: `/dashboard/user/licenses`,
      key: "licenses",
      title: "Licences",
      icon: <FaKey />,
    },
    {
      href: `/dashboard/user/devices`,
      key: "devices",
      title: "Appareils Activés",
      icon: <FaDesktop />,
    },
    {
      href: `/dashboard/user/settings`,
      key: "settings",
      title: "Paramètres",
      icon: <FaCog />,
    },
  ];

  const selectedKey = [
    "downloads",
    "licenses",
    "devices",
    "settings",
  ].includes(currentTab!)
    ? currentTab
    : "overview";

  return (
    <Tabs
      aria-label="Navigation du produit"
      className="w-full md:w-max"
      onSelectionChange={(key: any) => {
        const selectedTab = tabs.find((tab) => tab.key === key);
        if (selectedTab) {
          redirect(selectedTab.href);
        }
      }}
      selectedKey={selectedKey}>
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          title={
            <div className="flex items-center space-x-0 md:space-x-2">
              {tab.icon}
              <span className="hidden md:inline">{tab.title}</span>
            </div>
          }
        />
      ))}
    </Tabs>
  );
}
