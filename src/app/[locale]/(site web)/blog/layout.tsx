import { ReactNode } from "react";
import Header from "@/components/user/header";

// le layout de la page blog

interface BlogLayoutProps {
    children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
};

export default BlogLayout;