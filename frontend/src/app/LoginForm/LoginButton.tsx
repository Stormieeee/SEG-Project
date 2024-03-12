import React from "react";

const LoginButton = () => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    >
      Sign in
    </button>
  );
};

export default LoginButton;
