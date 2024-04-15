"use client";
import LoginForm from "./Components/LoginForm";
import Authentication from "./Components/Authentication";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);

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

  const handleSuccessAuth = () => {
    setShowAuth(false);
    if (isReset) {
      setShowResetPassword(true);
      setIsReset(false);
    } else {
      router.push("/roombooking");
    }
  };
  const handleFailedAuth = () => {
    setShowAuth(false);
    setShowLogin(true);
  };
  const handleSuccessLogin = () => {
    setShowLogin(false);
    setShowAuth(true);
  };
  const handleCancelAuth = () => {
    setShowAuth(false);
    setShowLogin(true);
  };
  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setShowLogin(false);
  };
  const handleSuccessForgot = () => {
    setIsReset(true);
    setShowForgotPassword(false);
    setShowAuth(true);
  };
  const handleCancelForgotPassword = () => {
    setShowForgotPassword(false);
    setShowLogin(true);
  };
  const handleCancelReset = () => {
    setShowResetPassword(false);
    setShowLogin(true);
  };
  const handleReset = () => {
    setShowResetPassword(false);
    setShowLogin(true);
  };
  return (
    <div className="flex flex-1">
      {showAuth && (
        <Authentication
          handleSuccessAuth={handleSuccessAuth}
          handleFailedAuth={handleFailedAuth}
          handleCancelAuth={handleCancelAuth}
        />
      )}
      {showLogin && (
        <LoginForm
          handleSuccessLogin={handleSuccessLogin}
          handleForgotPassword={handleForgotPassword}
          storeEmailInSessionStorage={storeEmailInSessionStorage}
        />
      )}
      {showForgotPassword && (
        <ForgotPassword
          handleSuccessForgot={handleSuccessForgot}
          handleCancelForgotPassword={handleCancelForgotPassword}
          storeEmailInSessionStorage={storeEmailInSessionStorage}
        />
      )}
      {showResetPassword && (
        <ResetPassword
          handleCancelReset={handleCancelReset}
          handleReset={handleReset}
        />
      )}
    </div>
  );
}
