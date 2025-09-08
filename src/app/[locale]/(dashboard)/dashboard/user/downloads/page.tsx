"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
} from "@heroui/react";
import { useTranslations } from "next-intl";

async function getPublicUpdates() {
  // Remplace par ton appel Prisma
  return [
    {
      id: "upd_1",
      versionNumber: "v7.2.3",
      publishedAt: new Date(),
      isLatest: true,
      changelog: "Correction de bugs critiques.",
    },
    {
      id: "upd_2",
      versionNumber: "v7.1.1",
      publishedAt: new Date(new Date().setDate(new Date().getDate() - 7)),
      isLatest: false,
      changelog: "Amélioration des performances.",
    },
  ];
}

export default async function DownloadsPage() {
  const updates = await getPublicUpdates();
  const t = useTranslations("DashboardUser.downloadsPage");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <Table aria-label={t("tableAriaLabel")}>
        <TableHeader>
          <TableColumn>{t("versionColumn")}</TableColumn>
          <TableColumn>{t("releaseDateColumn")}</TableColumn>
          <TableColumn>{t("notesColumn")}</TableColumn>
          <TableColumn>{t("downloadColumn")}</TableColumn>
        </TableHeader>
        <TableBody items={updates}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{item.versionNumber}</span>
                  {item.isLatest && (
                    <Chip
                      color="success"
                      size="sm">
                      {t("latestChip")}
                    </Chip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {new Date(item.publishedAt).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                <Button
                  variant="light"
                  size="sm">
                  {t("viewNotesButton")}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="flat">
                  {t("downloadButton")}
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
