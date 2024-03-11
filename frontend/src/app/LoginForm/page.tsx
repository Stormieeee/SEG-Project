"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/auth?`)

      //   try {
      //     const response = await fetch('/api/verify-email', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ email, password }),
      //     });

      //     if (response.ok) {
      //       // Email and password are verified, send OTP via email
      //       const otpResponse = await fetch('/api/send-otp', {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({ email }),
      //       });

      //       if (otpResponse.ok) {
      //         // OTP sent successfully
      //         console.log('OTP sent');
      //         router.push(`/auth?email=${encodeURIComponent(email)}`);
      //       } else {
      //         // Handle error response
      //         console.error('Failed to send OTP');
      //       }
      //     } else {
      //       // Handle error response
      //       console.error('Email and password verification failed');
      //     }
      //   } catch (error) {
      //     console.error('Error:', error);
      //   }
      };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className="flex items-center justify-center mb-4">
                            <img src="/Company-logo/Company Logo.svg" alt="Company Logo" />
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                    "
                                    placeholder="username@soton.ac.uk"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;