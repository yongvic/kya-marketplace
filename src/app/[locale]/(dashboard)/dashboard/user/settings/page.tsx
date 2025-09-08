"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Button,
} from "@heroui/react";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("DashboardUser.settingsPage");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">{t("profileInfoTitle")}</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <form className="space-y-4">
              <Input
                label={t("fullNameLabel")}
                defaultValue="Koffi Agbéti"
              />
              <Input
                label={t("emailLabel")}
                defaultValue="koffi@example.com"
                isReadOnly
              />
              <Button color="primary">{t("saveChangesButton")}</Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">{t("changePasswordTitle")}</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <form className="space-y-4">
              <Input
                type="password"
                label={t("currentPasswordLabel")}
              />
              <Input
                type="password"
                label={t("newPasswordLabel")}
              />
              <Input
                type="password"
                label={t("confirmPasswordLabel")}
              />
              <Button color="primary">{t("changePasswordButton")}</Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
