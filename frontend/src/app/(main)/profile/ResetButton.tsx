import React from "react";
import getEmailFromSessionStorage from "../../Components/CommonFunction";

interface ResetButtonProps {
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
}
const ResetButton = ({ setShowAuth }: ResetButtonProps) => {
  const handleReset = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowAuth(true);
    try {
      // Send request to resend OTP
      const response = await fetch("http://localhost:8000/SendOTP/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: getEmailFromSessionStorage() }),
      });

      if (!response.ok) {
        // Handle error response
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
