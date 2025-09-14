import type { Metadata } from "next";
// import { Libre_Franklin } from "next/font/google";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";




// 2. ✅ Métadonnées (SEO) — elles fonctionnent toujours ici
export const metadata: Metadata = {
    title: "KYA-Energy Group",
    description: "Votre partenaire pour une transition énergétique durable",
};

export default async function LocaleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();


    return (
        // 4. ✅ On garde la police via className
        <html lang={locale} suppressHydrationWarning>
            <body>
                {/* 5. ✅ Fournisseur de traductions */}
                <NextIntlClientProvider>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}