"use client"; // Cette page est interactive à cause du Modal

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Card,
  CardBody,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody as NextUITableBody,
  TableRow,
  TableCell,
  TableBody,
} from "@heroui/react";

// Formulaire de demande étudiant (composant séparé pour la clarté)
const StudentRequestForm = ({ onClose }: { onClose: () => void }) => (
  <div className="space-y-4">
    <p className="text-sm text-default-600">
      Veuillez fournir un document prouvant votre statut d'étudiant (carte
      d'étudiant, certificat de scolarité...) datant de moins d'un an.
    </p>
    {/* Remplace par un vrai composant d'upload */}
    <input
      type="file"
      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
    />
    <Button
      color="primary"
      fullWidth
      onPress={onClose}>
      Soumettre ma demande
    </Button>
    <p className="text-xs text-center text-default-500">
      Vous recevrez un email dès que votre demande aura été traitée.
    </p>
  </div>
);

export default function LicensesPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [licenseType, setLicenseType] = useState("");

  const handleSelectType = (type: string) => {
    setLicenseType(type);
    setStep(2);
  };

  const resetFlow = () => {
    setStep(1);
    setLicenseType("");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Licences & Facturation</h1>
        <Button
          color="primary"
          onPress={onOpen}>
          Acheter une licence
        </Button>
      </div>

      <Tabs aria-label="Options">
        <Tab
          key="licenses"
          title="Mes Licences">
          <Table aria-label="Mes licences">
            <TableHeader>
              <TableColumn>LICENCE</TableColumn>
              <TableColumn>CLÉ</TableColumn>
              <TableColumn>STATUT</TableColumn>
              <TableColumn>EXPIRE LE</TableColumn>
            </TableHeader>
            <TableBody emptyContent="Vous n'avez aucune licence.">
              {/* Ici, tu mapperais tes données de licences */}
              {[]}
            </TableBody>
          </Table>
        </Tab>
        <Tab
          key="billing"
          title="Historique de Facturation">
          {/* Table pour l'historique de facturation */}
        </Tab>
      </Tabs>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={resetFlow}
        size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {step === 1
                  ? "Choisir un type de licence"
                  : `Achat - Licence ${licenseType}`}
              </ModalHeader>
              <ModalBody>
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                      isPressable
                      onPress={() => handleSelectType("Commerciale")}>
                      <CardBody className="text-center p-8">
                        Commerciale
                      </CardBody>
                    </Card>
                    <Card
                      isPressable
                      onPress={() => handleSelectType("Académique")}>
                      <CardBody className="text-center p-8">
                        Académique
                      </CardBody>
                    </Card>
                    <Card
                      isPressable
                      onPress={() => handleSelectType("Étudiant")}>
                      <CardBody className="text-center p-8">Étudiant</CardBody>
                    </Card>
                  </div>
                )}
                {step === 2 && licenseType === "Étudiant" && (
                  <StudentRequestForm onClose={onClose} />
                )}
                {step === 2 &&
                  (licenseType === "Commerciale" ||
                    licenseType === "Académique") && (
                    <div>
                      <p>
                        Intégration du formulaire de paiement (Stripe, etc.)
                        ici.
                      </p>
                      <Button
                        color="primary"
                        fullWidth
                        className="mt-4"
                        onPress={onClose}>
                        Payer XX.XX €
                      </Button>
                    </div>
                  )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
