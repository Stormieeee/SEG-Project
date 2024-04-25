import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import PopupMessage from "./PopupMessage";

import dynamic from "next/dynamic";

import { StateProvider } from "./StateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Room Booking",
  description: "Room Booking For University of Southampton Malaysia",
};

// !!!!! This is the original export layout function !!!!!

// export default function layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="flex">
//           <Sidebar />
//           <div className="flex flex-col flex-grow bg-[#F8F8F8]">
//             <Topbar />
//             {children}
//           </div>
//         </div>
//       </body>
//     </html>
//   );

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // This is an attempt to fix hydration error
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <div
            className={`flex flex-col flex-grow overflow-x-hidden relative
          bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-gray-50 via-sky-400/10 to-gray-50`}
          >
            {/* dark:bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] dark:from-gray-800 dark:via-sky-900 dark:to-gray-800 */}
            <StateProvider>
              <PopupMessage />
              <Topbar />
              {children}
            </StateProvider>
          </div>
        </div>
      </body>
    </html>
  );
};

export default dynamic(() => Promise.resolve(layout), { ssr: false }); // This is an attempt to fix hydration error
