"use client";
import React, { useState , useEffect} from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";


const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [authorise, setAuthorisation] = useState("");
  const router = useRouter();

 
    // const fetchAuthorisation = async () =>{
    //   const response = await api.get('/login/');
    //   setAuthorisation(response.data)
    // }

    // useEffect(() =>{
    //   fetchAuthorisation();
    // }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!email.endsWith("@soton.ac.uk")) {
        setError("Email domain must be @soton.ac.uk");
        return;
      }
  
    
    fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: email, password: password }),
    })
      .then((response) => {
        if (response.ok) {
          router.push(`/auth?email=${encodeURIComponent(email)}`); // Email and password are verified, send OTP via email
        }
        throw new Error("Login Failed."); // Handle error response
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Uncomment the code below to verify email and password

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/Company-logo/Company Logo.svg" alt="Company Logo" />
            </div>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-slate-500">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
