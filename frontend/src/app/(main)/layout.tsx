import PageWrapper from "./roombooking/page-wrapper";
import MarginWidthWrapper from "./roombooking/marginWidthWrapper";
import Sidebar from "./Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className={inter.className}><div className="flex">
            
            <main className="flex-1">
                <MarginWidthWrapper>
                    <Sidebar />
                    {/* <Header /> */}
                    <PageWrapper>{children}</PageWrapper>
                </MarginWidthWrapper>
            </main>
            </div></body>
        </html>
    );
    }