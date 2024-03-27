import React from "react";
import PasswordVisibilityButton from "../Components/PasswordVisibilityButton";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  error: string;
}

const PasswordInput = ({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
}: PasswordInputProps) => {
  return (
    <div className=" w-full">
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-500"
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
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm focus:dark:placeholder-gray-700"
          required
        />
        <PasswordVisibilityButton
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}
    </div>
  );
};

export default PasswordInput;
