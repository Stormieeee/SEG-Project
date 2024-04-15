import EmailInput from "./EmailInput";
import { useState } from "react";
import { loginButtonStyle, cancelButtonStyle } from "./componentStyle";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
interface ForgotPasswordProps {
  handleSuccessForgot: () => void;
  handleCancelForgotPassword: () => void;
  storeEmailInSessionStorage: (email: string) => void;
}
const ForgotPassword = ({
  handleSuccessForgot,
  handleCancelForgotPassword,
  storeEmailInSessionStorage,
}: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Make sure email always stay in school email format
    if (!email.endsWith("@soton.ac.uk")) {
      setError("Email domain must be @soton.ac.uk");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/SendOTP/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: email }),
      });
      if (response.ok) {
        storeEmailInSessionStorage(email);
        handleSuccessForgot();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <section className="flex flex-auto bg-white-500 dark:bg-gray-900">
      <div className="flex flex-col w-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col">
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
              <div className="text-xl font-bold dark:text-slate-300">
                Please enter your email
              </div>
            </div>
            <form
              className="space-y-4 md:space-y-6 flex flex-col items-center"
              onSubmit={handleSubmit}
            >
              <EmailInput email={email} setEmail={setEmail} error={error} />
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex w-full space-x-4 justify-center">
                  <button
                    type="button"
                    onClick={handleCancelForgotPassword}
                    className={`${cancelButtonStyle}`}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={`${loginButtonStyle}`}>
                    Send
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
