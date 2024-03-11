"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Authentication = () => {
    const [otp, setOtp] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (otp === '1234'){
            router.push('/roombooking')
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
                        <div className="md:space-y-1">
                            <div className="text-xl font-bold dark:text-white">
                                OTP Authentication
                            </div>
                            <div className="text-sm dark:text-white">
                                {/* An OTP has been sent to {email}. Please enter the OTP code to continue. */}
                                An OTP has been sent to your email. Please enter the OTP code to continue.
                            </div>
                        </div>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    OTP Code
                                </label>
                                <input
                                    type="text"
                                    name="otp"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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

export default Authentication;
