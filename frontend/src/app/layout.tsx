import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

import PageWrapper from "./roombooking/page-wrapper";
import MarginWidthWrapper from "./roombooking/marginWidthWrapper";
import Sidebar from "./Sidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Room Booking",
  description: "Room Booking For University of Southampton Malaysia",
};

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
