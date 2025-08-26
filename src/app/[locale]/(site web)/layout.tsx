import Header from "@/components/user/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}