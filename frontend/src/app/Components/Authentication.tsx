"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getEmailFromSessionStorage from "../Components/CommonFunction";
import { backgroundStyle, cancelButtonStyle, inputFormat, loginButtonStyle } from "./componentStyle";

type AuthenticationProps = {
  handleSuccessAuth: () => void;
  handleFailedAuth: () => void;
  handleCancelAuth: () => void;
};

const Authentication = ({
  handleSuccessAuth,
  handleFailedAuth,
  handleCancelAuth,
}: AuthenticationProps) => {
  const email = getEmailFromSessionStorage();
  const [otp, setOtp] = useState("");
  const [disableResend, setDisableResend] = useState(false);
  const [countdown, setCountdown] = useState(10); // Countdown in seconds
  const router = useRouter();

  //Timeout for user if opt is not inputted in time
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (disableResend && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (disableResend && countdown === 0) {
      setDisableResend(false); // Enable resend button after countdown finishes
      setCountdown(10); // Reset countdown
    }
    return () => clearTimeout(timer);
  }, [disableResend, countdown]);

  //Handles OTP Authentication
  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if OTP is correct
    try {
      const response = await fetch("http://localhost:8000/authentication/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: email,
          key: otp,
        }),
      });

      if (response.ok) {
        // OTP verification successful
        // Redirect the user to the main page
        handleSuccessAuth();
      } else {
        // OTP verification failed
        console.log("Invalid OTP");
        handleFailedAuth();
      }
    } catch (error) {
      handleFailedAuth();
      console.error("Error:", error);
    }
  };

  //Resend OTP for user
  const handleResendOTP = async () => {
    setDisableResend(true);
    if (!disableResend) {
      try {
        // Send request to resend OTP
        const response = await fetch("http://localhost:8000/SendOTP/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: email }),
        });

        if (response.ok) {
          // OTP resent successfully
          // You can display a message to the user if needed
          setDisableResend(true); // Disable resend button after clicking
        } else {
          // Handle error response
          console.error("Failed to resend OTP");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  //Return UI
  return (
    <section className={`${backgroundStyle}`}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/Company-logo/Company Logo.svg"
                alt="Company Logo"
                width={0}
                height={0}
                layout="responsive"
              />
            </div>
            <div className="md:space-y-1">
              <div className="text-xl font-bold dark:text-slate-200">
                OTP Authentication
              </div>
              <div className="text-sm dark:text-slate-400">
                An OTP has been sent to {email}. Please enter the OTP code to
                continue.
              </div>
            </div>

            <form
              className="space-y-4 md:space-y-6 flex flex-col items-center"
              onSubmit={handleAuth}
            >
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-300">
                  OTP Code
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.trim())}
                  className={`${inputFormat}`}
                  required
                />
              </div>
              <div className="flex w-full justify-center items-center space-x-10">
                <button
                  type="button"
                  onClick={handleCancelAuth}
                  className={`${cancelButtonStyle}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`{${loginButtonStyle}}`}
                >
                  Verify
                </button>
              </div>
              <div className="text-center mt-2">
                <div className="text-center mt-2">
                  {!disableResend ? (
                    <>
                      <span className="text-gray-500">
                        Didn{`'`}t receive the verification OTP?
                      </span>
                      <span
                        className="text-primary-400 cursor-pointer hover:text-primary-500 pl-1"
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-500">
                        Resend code in{" "}
                        <span className="font-bold">{countdown} seconds</span>
                      </span>
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
