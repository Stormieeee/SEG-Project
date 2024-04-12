import React from "react";

import { inputFormat } from "./componentStyle";
interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  error: string;
}

const EmailInput = ({ email, setEmail, error }: EmailInputProps) => {
  return (
    <div className=" w-full">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-400"
      >
        Your email
      </label>
      <input
        autoComplete="false"
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        className={`${inputFormat}`}
        placeholder="username@soton.ac.uk"
        required
      />
      {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}
    </div>
  );
};

export default EmailInput;
