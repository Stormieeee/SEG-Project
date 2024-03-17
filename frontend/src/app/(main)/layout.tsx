import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Room Booking",
  description: "Room Booking For University of Southampton Malaysia",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-grow bg-[#F8F8F8]">
            <Topbar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );

  // return (
  //   <html lang="en">
  //     <body className={inter.className}>{children}</body>
  //   </html>
  // );
}

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// //import "./styles/globals.css";

// import PageWrapper from "./page-wrapper";
// import MarginWidthWrapper from "./marginWidthWrapper";
// import Sidebar from "./components/Sidebar";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Room Booking",
//   description: "Room Booking For University of Southampton Malaysia",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex">
//           <main className="flex-1">
//             <MarginWidthWrapper>
//               <Sidebar />
//               {/* <Header /> */}
//               <PageWrapper>{children}</PageWrapper>
//             </MarginWidthWrapper>
//           </main>
//         </div>
//       </body>
//     </html>
//   );
// }
