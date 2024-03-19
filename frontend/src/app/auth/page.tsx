"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

//Return Email from Session Storage
export function getEmailFromSessionStorage(): string | null {
  try {
    // Check if session storage is supported
    if (typeof sessionStorage !== "undefined") {
      // Retrieve the email from session storage
      const userEmail = sessionStorage.getItem("userEmail");
      console.log("Email retrieved from session storage:", userEmail);
      return userEmail;
    } else {
      console.error("Session storage is not supported in this browser.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving email from session storage:", error);
    return null;
  }
}

const Authentication = () => {
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
          user_id: getEmailFromSessionStorage(),
          key: otp,
        }),
      });

      const successfulDestination = sessionStorage.getItem(
        "successfulDestination"
      );
      const failedDestination = sessionStorage.getItem("failedDestination");

      if (response.ok) {
        // OTP verification successful
        // Redirect the user to the main page
        router.replace(successfulDestination || "/");
      } else {
        // OTP verification failed
        console.log("Invalid OTP");
        router.replace(failedDestination || "/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //Resend OTP for user
  const handleResendOTP = async () => {
    setDisableResend(true);
    if (!disableResend) {
      try {
        // Send request to resend OTP
        const response = await fetch("/api/resend-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Include any necessary data in the request body
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
    <section className="flex flex-auto bg-white-500 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-center mb-4">
              <img src="/Company-logo/Company Logo.svg" alt="Company Logo" />
            </div>
            <div className="md:space-y-1">
              <div className="text-xl font-bold dark:text-slate-300">
                OTP Authentication
              </div>
              <div className="text-sm dark:text-slate-300">
                An OTP has been sent to {getEmailFromSessionStorage()}. Please
                enter the OTP code to continue.
              </div>
            </div>

            <form
              className="space-y-4 md:space-y-6 flex flex-col items-center"
              onSubmit={handleAuth}
            >
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-50">
                  OTP Code
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-slate-500 dark:text-slate-200 dark:focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-1/3 justify-center text-white-50 bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Verify
              </button>
              <div className="text-center mt-2">
                <div className="text-center mt-2">
                  {!disableResend ? (
                    <>
                      <span className="text-gray-500">
                        Didn't receive the verification OTP?
                      </span>
                      <span
                        className="text-blue-400 cursor-pointer hover:text-blue-500 pl-1"
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-500">
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
