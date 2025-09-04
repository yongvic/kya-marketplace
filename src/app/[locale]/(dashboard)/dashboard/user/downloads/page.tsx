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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Téléchargements</h1>
      <Table aria-label="Versions du logiciel">
        <TableHeader>
          <TableColumn>VERSION</TableColumn>
          <TableColumn>DATE DE SORTIE</TableColumn>
          <TableColumn>NOTES</TableColumn>
          <TableColumn>TÉLÉCHARGER</TableColumn>
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
                      Dernière
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
                  Voir
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  color="primary"
                  variant="flat">
                  Télécharger
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
