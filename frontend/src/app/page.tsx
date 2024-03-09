import { useState } from "react";
import Sidebar from "./Sidebar";


export default function Home() {
  return (
    <>
      <div className="flex">
        <div className="h-screen flex flex-row justify-start">
          <Sidebar />
        </div>
        <div className="flex-grow flex">
          {/* <DateTime /> */}
        </div>
      </div>
    </>
  );
}
