import React from "react";
import visible from "../../../public/Login-icon/Visible.svg";
import invisible from "../../../public/Login-icon/Invisible.svg";
import Image from "next/image";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
}

const PasswordInput = ({ password, setPassword, showPassword, setShowPassword }: PasswordInputProps) => {
  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm"
          required
        />
        <button
            type="button"
            className="absolute top-1/2 transform -translate-y-1/2 right-2 w-4 h-4"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? <Image src={visible} alt="Visible" /> : <Image src={invisible} alt="Invisible" />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;