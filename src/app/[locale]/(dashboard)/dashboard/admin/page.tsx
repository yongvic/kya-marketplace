import { Card, CardBody, CardHeader } from "@heroui/react";
import { GrapheDesVentes } from "@/components/dashboard/admin/GrapheDesVentes";

async function getSalesData() {
  // Remplace par ton appel Prisma pour agréger les ventes par jour
  return [
    {
      name: "01/10",
      ventes: 30,
    },
    {
      name: "02/10",
      ventes: 45,
    },
    {
      name: "03/10",
      ventes: 28,
    },
    // ... 27 autres jours
  ];
}

export default async function AdminOverviewPage() {
  const salesData = await getSalesData();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vue d'ensemble</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardBody>
            <p className="text-default-500">Revenu (30j)</p>
            <p className="text-2xl font-bold">1,250 €</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-default-500">Nouveaux Clients (30j)</p>
            <p className="text-2xl font-bold">42</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="text-default-500">Demandes en attente</p>
            <p className="text-2xl font-bold">8</p>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <h2 className="font-semibold">
            Ventes de licences (30 derniers jours)
          </h2>
        </CardHeader>
        <CardBody>
          <GrapheDesVentes data={salesData} />
        </CardBody>
      </Card>
    </div>
  );
}
