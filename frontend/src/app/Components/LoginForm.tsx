"use client";
import React, { useState, useEffect } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../Components/LoadingSpinner";
import Image from "next/image";

interface LoginProps {
  handleSuccessLogin: () => void;
  handleForgotPassword: () => void;
  storeEmailInSessionStorage: (email: string) => void;
}
const Login = ({
  handleSuccessLogin,
  handleForgotPassword,
  storeEmailInSessionStorage,
}: LoginProps) => {
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //Handles login attempts
  useEffect(() => {
    if (attempts === 0) {
      console.log("You have exceeded the number of attempts");
      setAttempts(3);
    }
  }, [attempts]);

  //Handles User Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Make sure email always stay in school email format
    if (!email.endsWith("@soton.ac.uk")) {
      setError("Email domain must be @soton.ac.uk");
      return;
    }
    setLoading(true);

    //Establish API connection and authenticate input
    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: email, password: password }),
      });
      if (response.ok) {
        //Response from API is ok (200) then store email in session and continue
        storeEmailInSessionStorage(email);
        handleSuccessLogin();
      } else {
        // Handle error response
        console.error("Email and password verification failed");
        setPasswordError("Invalid email or password");
        setAttempts((prevAttempts) => prevAttempts - 1);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Add event listener to form for Enter key press
  const handleFormKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  //Login Form
  return (
    <section className="flex flex-auto bg-white-500 dark:bg-gray-900">
      <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/Company-logo/Company Logo.svg"
                alt="Company Logo"
                width={0}
                height={0}
                layout="responsive"
              />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-slate-200">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6 flex flex-col items-center"
              onSubmit={handleLogin}
              onKeyDown={handleFormKeyPress}
            >
              <EmailInput email={email} setEmail={setEmail} error={error} />
              <PasswordInput
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={passwordError}
              />
              <button className="underline dark:text-slate-400 hover:text-slate-500 " onClick={handleForgotPassword}>
                Forget Password?
              </button>
              {loading ? <LoadingSpinner /> : <LoginButton />}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
