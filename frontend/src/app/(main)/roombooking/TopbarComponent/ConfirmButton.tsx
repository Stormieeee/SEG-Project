"use client";
import React from "react";

const ConfirmButton = ({onClick} : any) => {
    
    return (
        <button 
        onClick={onClick}
        className="w-36 h-10 font-medium text-primary-500 bg-primary-500/10 mr-4 rounded-[3rem] text-center cursor-pointer duration-200 ease hover:bg-primary-400/30 hover:text-primary-600 hover:shadow-md hover:scale-95">
            Confirm
        </button>
    );
}
export default ConfirmButton;