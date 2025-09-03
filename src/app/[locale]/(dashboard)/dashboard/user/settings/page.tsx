"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Button,
} from "@heroui/react";

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Paramètres du Compte</h1>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Informations du profil</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <form className="space-y-4">
              <Input
                label="Nom complet"
                defaultValue="Koffi Agbéti"
              />
              <Input
                label="Email"
                defaultValue="koffi@example.com"
                isReadOnly
              />
              <Button color="primary">Enregistrer les modifications</Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Changer le mot de passe</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <form className="space-y-4">
              <Input
                type="password"
                label="Mot de passe actuel"
              />
              <Input
                type="password"
                label="Nouveau mot de passe"
              />
              <Input
                type="password"
                label="Confirmer le nouveau mot de passe"
              />
              <Button color="primary">Changer le mot de passe</Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
