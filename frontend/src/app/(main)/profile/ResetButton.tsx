import React from "react";
import { useRouter } from "next/navigation";

interface ResetButtonProps {
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
const ResetButton = ({ setShowAuth }: ResetButtonProps) => {
  const router = useRouter();
  const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowAuth(true);
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
