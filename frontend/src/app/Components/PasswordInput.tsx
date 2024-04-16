import React from "react";
import PasswordVisibilityButton from "./PasswordVisibilityButton";
import { inputFormat } from "./componentStyle";

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
        className="block mb-2 text-base md:text-sm font-medium text-gray-900 dark:text-slate-400"
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
          onChange={(e) => setPassword(e.target.value.trim())}
          className={`${inputFormat}`}
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
