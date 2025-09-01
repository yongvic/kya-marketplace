import LogicielsLayoutClient from "@/components/user/logiciels/logicielsLayoutClient";

export default function LogicielsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LogicielsLayoutClient>
            {children}
        </LogicielsLayoutClient>
    );
}