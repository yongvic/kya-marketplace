"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@heroui/react";

async function getLicenseRequests() {
  // Remplace par ton appel Prisma
  return [
    {
      id: "req_1",
      studentName: "Georges-Noé",
      email: "georges.ahombo@gmail.com",
      date: new Date(),
      status: "pending",
    },
    {
      id: "req_2",
      studentName: "Victor Banenga",
      email: "banenga26@gmail.com",
      date: new Date(),
      status: "pending",
    },
  ];
}

export default async function LicenseRequestsPage() {
  const requests = await getLicenseRequests();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Demandes de Licences Étudiant</h1>
      <Table aria-label="Demandes de licences">
        <TableHeader>
          <TableColumn>ÉTUDIANT</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>DOCUMENT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          items={requests}
          emptyContent="Aucune demande en attente.">
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.studentName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {new Date(item.date).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="bordered">
                  Voir la preuve
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="success"
                    variant="flat">
                    Approuver
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="flat">
                    Rejeter
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
