"use client";
import React from "react";
import { useStateContext } from "../StateContext";

const ConfirmButton = () => {
    
    return (
        <button className="w-40 h-10 font-semibold text-[#ffffff] bg-primary-500 mr-4 rounded-[80em] text-center cursor-pointer transition duration-200 linear hover:bg-primary-600 hover:text-[#ffffff] hover:shadow-md transform hover:scale-95">
            Confirm
        </button>
    );
}
export default ConfirmButton;