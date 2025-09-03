import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import "@/styles/globals.css";

// 1. ✅ Police
const libreFranklin = Libre_Franklin({
    subsets: ["latin"],
    variable: "--font-libre-franklin",
    display: "swap",
});

// 2. ✅ Métadonnées (SEO) — elles fonctionnent toujours ici
export const metadata: Metadata = {
    title: "KYA-Energy Group",
    description: "Votre partenaire pour une transition énergétique durable",
};

// 3. ✅ Layout localisé
export default async function LocaleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = (await import(`@/messages/${locale}.json`)).default;

    return (
        // 4. ✅ On garde la police via className
        <html lang={locale} className={libreFranklin.variable} suppressHydrationWarning>
            <body className="antialiased">
                {/* 5. ✅ Fournisseur de traductions */}
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}