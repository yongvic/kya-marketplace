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
import { useTranslations } from "next-intl";

// Formulaire de demande étudiant (composant séparé pour la clarté)
const StudentRequestForm = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations("DashboardUser.licensesPage.studentForm");
  return (
    <div className="space-y-4">
      <p className="text-sm text-default-600">{t("info")}</p>
      {/* Remplace par un vrai composant d'upload */}
      <input
        type="file"
        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
      />
      <Button
        color="primary"
        fullWidth
        onPress={onClose}>
        {t("submitButton")}
      </Button>
      <p className="text-xs text-center text-default-500">{t("feedback")}</p>
    </div>
  );
};

export default function LicensesPage() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [licenseType, setLicenseType] = useState("");
  const t = useTranslations("DashboardUser.licensesPage");

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
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button
          color="primary"
          onPress={onOpen}>
          {t("buyLicenseButton")}
        </Button>
      </div>

      <Tabs aria-label="Options">
        <Tab
          key="licenses"
          title={t("myLicensesTab")}>
          <Table aria-label={t("myLicensesTableAria")}>
            <TableHeader>
              <TableColumn>{t("licenseColumn")}</TableColumn>
              <TableColumn>{t("keyColumn")}</TableColumn>
              <TableColumn>{t("statusColumn")}</TableColumn>
              <TableColumn>{t("expiresOnColumn")}</TableColumn>
            </TableHeader>
            <TableBody emptyContent={t("noLicenses")}>
              {/* Ici, tu mapperais tes données de licences */}
              {[]}
            </TableBody>
          </Table>
        </Tab>
        <Tab
          key="billing"
          title={t("billingHistoryTab")}>
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
                  ? t("modalChooseTitle")
                  : t("modalPurchaseTitle", { licenseType })}
              </ModalHeader>
              <ModalBody>
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card
                      isPressable
                      onPress={() => handleSelectType(t("commercialType"))}>
                      <CardBody className="text-center p-8">
                        {t("commercialType")}
                      </CardBody>
                    </Card>
                    <Card
                      isPressable
                      onPress={() => handleSelectType(t("academicType"))}>
                      <CardBody className="text-center p-8">
                        {t("academicType")}
                      </CardBody>
                    </Card>
                    <Card
                      isPressable
                      onPress={() => handleSelectType(t("studentType"))}>
                      <CardBody className="text-center p-8">
                        {t("studentType")}
                      </CardBody>
                    </Card>
                  </div>
                )}
                {step === 2 && licenseType === t("studentType") && (
                  <StudentRequestForm onClose={onClose} />
                )}
                {step === 2 &&
                  (licenseType === t("commercialType") ||
                    licenseType === t("academicType")) && (
                    <div>
                      <p>{t("paymentForm.info")}</p>
                      <Button
                        color="primary"
                        fullWidth
                        className="mt-4"
                        onPress={onClose}>
                        {t("paymentForm.payButton", { amount: "XX.XX" })}
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
