import React from "react";
import Image from "next/image";
import visible from "/public/Login-icon/Visible.svg";
import invisible from "/public/Login-icon/Invisible.svg";

interface PasswordVisibilityButtonProps {
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const PasswordVisibilityButton = ({
  showPassword,
  setShowPassword,
}: PasswordVisibilityButtonProps) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 transform -translate-y-1/2 right-2 w-4 h-4"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <Image src={visible} alt="Visible" />
      ) : (
        <Image src={invisible} alt="Invisible" />
      )}
    </button>
  );
};

export default PasswordVisibilityButton;
