import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordVisibilityButton from "@/app/Components/PasswordVisibilityButton";
import Image from "next/image";

interface ResetPasswordProps {
  setShowResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
const ResetPassword = ({ setShowResetPassword }: ResetPasswordProps) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const isPasswordValid = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLengthValid = password.length >= 8;

    return (
      hasUpperCase &&
      hasLowerCase &&
      hasDigit &&
      hasSpecialChar &&
      isLengthValid
    );
  };
  const handleCancel = () => {
    setShowResetPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = sessionStorage.getItem("userEmail");
    setLoading(true);

    if (!isPasswordValid(newPassword)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    // Reset password
    try {
      const response = await fetch("http://localhost:8000/edit_password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: email, new_password: newPassword }),
      });

      if (response.ok) {
        window.location.href = "/";
        window.history.replaceState(null, "", "/");
      } else {
        alert("Failed to reset password");
      }
    } catch (err) {
      alert("Failed to reset password");
    }

    setLoading(false);
  };

  return (
    <section className="flex flex-1 bg-white-500 justify-center bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
      <div className="flex w-full flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border">
          <div className="flex-1 p-8 space-y-4 md:space-y-6 sm:p-8 flex flex-col">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/Company-logo/Company Logo.svg"
                alt="Company Logo"
                width={0}
                height={0}
                layout="responsive"
              />
            </div>
            <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Reset password
            </div>
            <form
              className="space-y-4 md:space-y-6 flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <div className="w-full">
                <label
                  htmlFor="new-password"
                  className="block mb-2 mt-5 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="new-password"
                    id="new-password"
                    value={newPassword}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 sm:text-sm focus:placeholder-gray-700"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "Enter new password")
                    }
                    required
                  />
                  <PasswordVisibilityButton
                    showPassword={showNewPassword}
                    setShowPassword={setShowNewPassword}
                  />
                </div>
                <label
                  htmlFor="confirm-password"
                  className="block mt-5 mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    value={confirmPassword}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 sm:text-sm focus:placeholder-gray-700"
                    placeholder="Confirm new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) =>
                      (e.target.placeholder = "Confirm new password")
                    }
                    required
                  />
                  <PasswordVisibilityButton
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                  />
                </div>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
              <div className="flex justify-between w-full">
                <button
                  name="cancel-button"
                  className="w-2/5 items-center justify-center text-gray-900 px-2 py-3 text-center text-sm bg-gray-300 hover:bg-gray-400 font-bold rounded-lg"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  name="reset-pwd-button"
                  type="submit"
                  className="w-2/5 items-center justify-center text-white-50 px-2 py-3 text-center text-sm bg-blue-400 hover:bg-blue-500 font-bold rounded-lg"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
