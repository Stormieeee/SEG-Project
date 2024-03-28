"use client";
import LoginForm from "./Components/LoginForm";
import Authentication from "./Components/Authentication";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const handleSuccessAuth = () => {
    setShowAuth(false);
    router.push("/roombooking");
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
  return (
    <div className="flex flex-1">
      {showAuth && (
        <Authentication
          handleSuccessAuth={handleSuccessAuth}
          handleFailedAuth={handleFailedAuth}
          handleCancelAuth={handleCancelAuth}
        />
      )}
      {showLogin && <LoginForm handleSuccessLogin={handleSuccessLogin} />}
    </div>
  );
}