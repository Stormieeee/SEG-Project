"use client";
import React, { useState, useEffect} from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import LoginButton from "./LoginButton";
import { useRouter } from "next/navigation";


const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [attempts, setAttempts] = useState(3);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // const [authorise, setAuthorisation] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (attempts === 0) {
      console.log('You have exceeded the number of attempts');
      setAttempts(3);
    }
  },[attempts]);
  
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email.endsWith('@soton.ac.uk')) {
      setEmailError('Email domain must be @soton.ac.uk');
      return;
    }
    // Just for testing purposes, so that we can move to the next page
<<<<<<< HEAD
    if (password === '1234') {
      router.push(`/auth?` + createQueryString('email', email));
    } else {
      setPasswordError('Invalid email or password');
      setAttempts(prevAttempts => prevAttempts - 1);
    }
=======
    // if (password === '1234') {
    //   router.push(`/auth?` + createQueryString('email', email));
    // } else {
    //   setAttempts(prevAttempts => prevAttempts - 1);
    // }
>>>>>>> 37a294e8bfa434d2ad3789b149a2ff54f3cfba05

    // Uncomment the code below to verify email and password

    try {
        const response = await fetch('http://localhost:8000/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: email, password: password }),
        });

        if (response.ok) {
          // Email and password are verified, send OTP via email
            router.push(`/auth?email=${encodeURIComponent(email)}`);
        } else {
          // Handle error response
          console.error('Email and password verification failed');
          setAttempts(prevAttempts => prevAttempts - 1);
        }
    } catch (error) {
    console.error('Error:', error);
    }
};

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
              <EmailInput email={email} setEmail={setEmail} error={emailError} />
              <PasswordInput
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                error={passwordError}
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
