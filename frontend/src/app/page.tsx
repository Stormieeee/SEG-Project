"use client";
import LoginForm from "./Components/LoginForm";
import Authentication from "./Components/Authentication";
import ResetPassword from "./Components/ResetPassword";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);
  const handleSuccessAuth = () => {
    if (isReset) {
      setShowResetPassword(true);
      setIsReset(false);
    } else {
      setShowAuth(false);
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
          setIsReset={setIsReset}
          setShowAuth={setShowAuth}
          setShowLogin={setShowLogin}
        />
      )}
      {showResetPassword && <ResetPassword handleReset={handleReset} />}
    </div>
  );
}
