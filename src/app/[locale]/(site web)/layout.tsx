import Header from "@/components/user/header";
import Footer from "@/components/user/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}