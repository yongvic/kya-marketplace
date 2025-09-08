"use client";
import { Tabs, Tab } from "@heroui/react";
import { redirect, usePathname } from "next/navigation";
import { FaCog, FaDesktop, FaDownload, FaHome, FaKey } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function TabNavigation() {
  const pathname = usePathname();
  const t = useTranslations("DashboardUser.tabNavigation");

  // Détermine l'onglet actif à partir de l'URL
  const currentTab = pathname.split("/").pop();

  const tabs = [
    {
      href: `/dashboard/user`,
      key: "overview",
      title: t("overview"),
      icon: <FaHome />,
    },
    {
      href: `/dashboard/user/downloads`,
      key: "downloads",
      title: t("downloads"),
      icon: <FaDownload />,
    },
    {
      href: `/dashboard/user/licenses`,
      key: "licenses",
      title: t("licenses"),
      icon: <FaKey />,
    },
    {
      href: `/dashboard/user/devices`,
      key: "devices",
      title: t("devices"),
      icon: <FaDesktop />,
    },
    {
      href: `/dashboard/user/settings`,
      key: "settings",
      title: t("settings"),
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
      aria-label={t("ariaLabel")}
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
