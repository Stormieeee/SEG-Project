import React from "react";

const LoginButton = () => {
  return (
    <button
      type="submit"
      className="w-1/3 items-center justify-center text-white-50  px-5 py-3 text-center text-sm
      bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Sign in
    </button>
  );
};

export default LoginButton;
