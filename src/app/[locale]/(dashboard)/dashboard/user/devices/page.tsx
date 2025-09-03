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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appareils Activés</h1>
      <p className="text-sm text-default-600 mb-4">
        Vous pouvez désactiver un appareil pour libérer une place sur votre
        licence.
      </p>
      <Table aria-label="Appareils activés">
        <TableHeader>
          <TableColumn>APPAREIL</TableColumn>
          <TableColumn>DATE D'ACTIVATION</TableColumn>
          <TableColumn>LICENCE</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          items={devices}
          emptyContent="Aucun appareil activé.">
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
                  content="Désactiver cet appareil">
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
