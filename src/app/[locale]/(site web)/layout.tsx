import Footer from '@/components/user/footer';

// Ce layout est le conteneur principal pour les pages du site.
// NE METTEZ PAS le composant <Header /> ici.
export default function SiteWebLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* "children" représentera le contenu de chaque page, y compris leur propre header */}
            {children}

            <Footer />
        </>
    );
}