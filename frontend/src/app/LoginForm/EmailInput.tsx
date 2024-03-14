import React from "react";

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
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-500"
      >
        Your email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-slate-500 dark:text-slate-300 dark:focus:border-blue-500 sm:text-sm focus:placeholder:"
        placeholder="username@soton.ac.uk"
        required
      />
      {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}
    </div>
  );
};

export default EmailInput;
