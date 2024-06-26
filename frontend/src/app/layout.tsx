import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";


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
      <body className={inter.className}>
        <div className="flex">

          <main className="flex-1 flex">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
