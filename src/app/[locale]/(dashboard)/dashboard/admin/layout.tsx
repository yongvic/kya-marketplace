"use client"; // Ce layout est interactif (barre latérale rétractable)

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Button,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  FaTachometerAlt,
  FaFileContract,
  FaCog,
  FaBell,
  FaChevronLeft,
  FaSignOutAlt,
  FaKey,
} from "react-icons/fa"; // npm install react-icons

const navItems = [
  {
    href: "/dashboard/admin",
    icon: <FaTachometerAlt />,
    label: "Vue d'ensemble",
  },
  {
    href: "/dashboard/admin/license-requests",
    icon: <FaFileContract />,
    label: "Demandes de licences",
  },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      {/* Barre Latérale */}
      <aside
        className={`flex flex-col bg-content1 text-content1-foreground transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}>
        {/* Header de la barre latérale */}
        <div className="flex items-center justify-between p-4 border-b border-divider">
          {!isCollapsed && (
            <span className="font-bold text-lg">Admin KYA-Sol</span>
          )}
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => setIsCollapsed(!isCollapsed)}
            className="text-default-500">
            <FaChevronLeft
              className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : "rotate-0"}`}
            />
          </Button>
        </div>

        {/* Navigation Principale */}
        <nav className="flex-grow p-2 space-y-2">
          {navItems.map((item) => (
            <Tooltip
              key={item.href}
              content={item.label}
              placement="right"
              isDisabled={!isCollapsed}>
              <Link href={item.href}>
                <div
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-content2"
                  }`}>
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="ml-4 font-medium">{item.label}</span>
                  )}
                </div>
              </Link>
            </Tooltip>
          ))}
        </nav>

        {/* Footer de la barre latérale */}
        <div className="p-2 border-t border-divider space-y-2">
          <Tooltip
            content="Paramètres"
            placement="right"
            isDisabled={!isCollapsed}>
            <Link href="/dashboard/admin/settings">
              <div className="flex items-center p-3 rounded-lg hover:bg-content2">
                <span className="text-xl">
                  <FaCog />
                </span>
                {!isCollapsed && (
                  <span className="ml-4 font-medium">Paramètres</span>
                )}
              </div>
            </Link>
          </Tooltip>
          <Dropdown placement="top-end">
            <DropdownTrigger>
              {/* Le Tooltip s'applique au bouton qui déclenche le Dropdown */}
              {/* <Tooltip */}
              {/*   content="Notifications" */}
              {/*   placement="right" */}
              {/*   isDisabled={!isCollapsed}> */}
              <button className="w-full flex items-center p-3 rounded-lg hover:bg-content2">
                <span className="text-xl">
                  <FaBell />
                </span>
                {!isCollapsed && (
                  <span className="ml-4 font-medium">Notifications</span>
                )}
              </button>
              {/* </Tooltip> */}
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Notifications"
              emptyContent="Aucune nouvelle notification.">
              {/* Ici, vous mapperez vos notifications réelles */}
              <DropdownItem
                key="new_request"
                description="Georges-Noé a soumis une demande de licence étudiant."
                startContent={<FaFileContract className="text-primary" />}>
                Nouvelle demande
              </DropdownItem>
              <DropdownItem
                key="new_sale"
                description="Une licence Pro a été vendue."
                startContent={<FaKey className="text-success" />}>
                Nouvelle vente
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown placement="top-end">
            <DropdownTrigger>
              <div className="flex items-center p-3 rounded-lg hover:bg-content2 cursor-pointer">
                <Avatar
                  size="sm"
                  name="Admin"
                />
                {!isCollapsed && (
                  <span className="ml-4 font-medium">Admin</span>
                )}
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions de l'utilisateur">
              <DropdownItem
                key="profile"
                href="/dashboard/admin/settings">
                Mon Compte
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                startContent={<FaSignOutAlt />}>
                Déconnexion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </aside>

      {/* Contenu Principal */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
