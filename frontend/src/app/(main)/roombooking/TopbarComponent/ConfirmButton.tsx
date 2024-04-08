"use client";
import React from "react";

const ConfirmButton = ({onClick} : any) => {
    
    return (
        <button 
        onClick={onClick}
        className="w-36 h-10 font-semibold text-[#ffffff] bg-primary-500 mr-4 rounded-[3rem] text-center cursor-pointer transition duration-200 linear hover:bg-primary-600 hover:text-[#ffffff] hover:shadow-md transform hover:scale-95">
            Confirm
        </button>
    );
}
export default ConfirmButton;