"use client";
import React, { useState, useEffect } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
        router.push(`/auth?email=${encodeURIComponent(email)}`);
      } else {
        // Handle error response
        console.error("Email and password verification failed");
        setAttempts((prevAttempts) => prevAttempts - 1);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function storeEmailInSessionStorage(email: string): void {
    try {
      // Check if session storage is supported
      if (typeof sessionStorage !== "undefined") {
        // Store the email in session storage
        sessionStorage.setItem("userEmail", email);
        console.log("Email stored in session storage:", email);
      } else {
        console.error("Session storage is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error storing email in session storage:", error);
    }
  }


  //Login Form
  return (
    <section className="bg-white-500 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-center mb-4">
              <img src="/Company-logo/Company Logo.svg" alt="Company Logo" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-slate-500">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6 flex flex-col items-center"
              onSubmit={handleLogin}
            >
              <EmailInput email={email} setEmail={setEmail} error={error} />
              <PasswordInput
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <LoginButton />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
