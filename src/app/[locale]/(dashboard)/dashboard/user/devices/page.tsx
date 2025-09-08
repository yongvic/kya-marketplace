"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
} from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { useTranslations } from "next-intl";

async function getActivatedDevices() {
  // Remplace par ton appel Prisma
  return [
    {
      id: "act_1",
      machineFingerprint: "DESKTOP-ABC123",
      activatedAt: new Date(),
      licenseKey: "...-ABCD",
    },
    {
      id: "act_2",
      machineFingerprint: "LAPTOP-XYZ789",
      activatedAt: new Date(new Date().setDate(new Date().getDate() - 30)),
      licenseKey: "...-ABCD",
    },
  ];
}

export default async function DevicesPage() {
  const devices = await getActivatedDevices();
  const t = useTranslations("DashboardUser.devicesPage");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <p className="text-sm text-default-600 mb-4">{t("subtitle")}</p>
      <Table aria-label={t("tableAriaLabel")}>
        <TableHeader>
          <TableColumn>{t("deviceColumn")}</TableColumn>
          <TableColumn>{t("activationDateColumn")}</TableColumn>
          <TableColumn>{t("licenseColumn")}</TableColumn>
          <TableColumn>{t("actionsColumn")}</TableColumn>
        </TableHeader>
        <TableBody
          items={devices}
          emptyContent={t("noDevices")}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.machineFingerprint}</TableCell>
              <TableCell>
                {new Date(item.activatedAt).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>{item.licenseKey}</TableCell>
              <TableCell>
                <Tooltip
                  color="danger"
                  content={t("deactivateTooltip")}>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger">
                    <FaTrash />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
