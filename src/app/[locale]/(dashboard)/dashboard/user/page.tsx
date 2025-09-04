import {
  Card,
  CardBody,
  CardHeader,
  Progress,
  Chip,
  Button,
  Divider,
} from "@heroui/react";
import { differenceInDays } from "date-fns";
import Link from "next/link";

// Simule la récupération de la licence active de l'utilisateur
async function getActiveLicense() {
  // Remplace par ton appel Prisma
  // const license = await prisma.customerLicense.findFirst({ where: { userId: session.user.id, status: 'ACTIVE' } });
  const license = {
    id: "cl_123",
    status: "ACTIVE",
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 85)), // Expire dans 85 jours
    license: {
      name: "Licence Professionnelle",
    },
  };
  // Pour tester le cas sans licence, retourne null
  // return null;
  return license;
}

export default async function OverviewPage() {
  const license = await getActiveLicense();
  const daysRemaining = license
    ? differenceInDays(new Date(license.expiresAt), new Date())
    : 0;
  const totalDays = 365; // Supposons une licence d'un an

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Vue d'ensemble</h1>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Statut de votre Licence</h2>
        </CardHeader>
        <Divider />
        <CardBody>
          {license ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Chip
                  color="success"
                  variant="flat">
                  Licence Active
                </Chip>
                <span className="text-default-500 text-sm">
                  {license.license.name}
                </span>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-success">
                    {daysRemaining} jours restants
                  </span>
                  <span className="text-sm font-medium text-default-500">
                    Expire le{" "}
                    {new Date(license.expiresAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <Progress
                  aria-label="Jours restants"
                  value={(daysRemaining / totalDays) * 100}
                  color="success"
                  className="max-w-full"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-default-600 mb-4">
                Vous n'avez aucune licence active.
              </p>
              <Button
                as={Link}
                href="/user/licenses"
                color="primary">
                Acheter une licence
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      <div className="mt-8">
        <Button
          as={Link}
          href="/user/downloads"
          color="primary"
          size="lg"
          fullWidth>
          Télécharger la dernière version du logiciel
        </Button>
      </div>
    </div>
  );
}
