import React from "react";
import { useRouter } from "next/navigation";

interface ResetButtonProps {
  setShowResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
const ResetButton = ({ setShowResetPassword }: ResetButtonProps) => {
  const router = useRouter();
  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    sessionStorage.setItem("successfulDestination", "/profile/passwordreset");
    sessionStorage.setItem("failedDestination", "/profile");
    router.replace("/auth");
  };
  return (
    <button
      className="text-blue-600 text-base font-semibold px-2 underline"
      onClick={handleReset}
    >
      Reset
    </button>
  );
};

export default ResetButton;
