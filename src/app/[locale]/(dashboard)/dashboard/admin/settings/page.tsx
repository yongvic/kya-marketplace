"use client"; // Formulaires interactifs

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Button,
} from "@heroui/react";

export default function AdminAccountSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">
          Informations du compte Administrateur
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <form className="space-y-4">
          <Input
            label="Nom complet"
            defaultValue="Admin KYA-Sol"
          />
          <Input
            label="Email"
            defaultValue="admin@kya.tg"
            isReadOnly
          />
          <Button color="primary">Enregistrer les modifications</Button>
        </form>
      </CardBody>
    </Card>
  );
}
