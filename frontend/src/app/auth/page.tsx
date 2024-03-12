"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Authentication = () => {
    const [otp, setOtp] = useState('');
    const [attempts, setAttempts] = useState(3);
    const [disableResend, setDisableResend] = useState(false);
    const [countdown, setCountdown] = useState(10); // Countdown in seconds
    const router = useRouter();

    useEffect(() => {
        if (attempts <= 0) {
            router.replace('/') // Redirect to login page after 3 failed attempts
        }
    }, [attempts]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (disableResend && countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        } else if (disableResend && countdown === 0) {
            setDisableResend(false); // Enable resend button after countdown finishes
            setCountdown(10); // Reset countdown
        }
        return () => clearTimeout(timer);
    }, [disableResend, countdown]);

    const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAttempts(prevAttempts => prevAttempts - 1);

        // Just for testing purposes
        if (otp === '1234') {
            router.push('/roombooking');
            return;
        }
        // Uncomment the code below to verify OTP

        // Check if OTP is correct
        // try {
        //     const response = await fetch('/api/verify-otp', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ otp }),
        //     });

        //     if (response.ok) {
        //         // OTP verification successful
        //         // Redirect the user to the main page
        //         router.push('/roombooking');
        //     } else {
        //         // OTP verification failed
        //         console.log('Invalid OTP');
        //         setAttempts(prevAttempts => prevAttempts + 1);
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };

    const handleResendOTP = async () => {
        setDisableResend(true);
        if (!disableResend) {
            try {
                // Send request to resend OTP
                const response = await fetch('/api/resend-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // Include any necessary data in the request body
                });

                if (response.ok) {
                    // OTP resent successfully
                    // You can display a message to the user if needed
                    setDisableResend(true); // Disable resend button after clicking
                } else {
                    // Handle error response
                    console.error('Failed to resend OTP');
                }
            } catch (error) {
                console.error('Error:', error);
            }
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
                            <div className="text-xl font-bold dark:text-white-50">
                                OTP Authentication
                            </div>
                            <div className="text-sm dark:text-white-50">
                                An OTP has been sent to your email. Please enter the OTP code to continue.
                            </div>
                        </div>

                        <form className="space-y-4 md:space-y-6" onSubmit={handleAuth}>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-50"
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
                                className="w-full text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Verify
                            </button>
                            <div className="text-center mt-2">
                                <div className="text-center mt-2">
                                {!disableResend ? (
                                    <>
                                        <span className="text-gray-500">Didn't receive the verification OTP?</span>
                                        <span className="text-blue-400 cursor-pointer hover:text-blue-500" onClick={handleResendOTP}>
                                            Resend OTP
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-gray-500">Resend code in <span className="font-bold">{countdown} seconds</span></span>
                                    </>
                                )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Authentication;
