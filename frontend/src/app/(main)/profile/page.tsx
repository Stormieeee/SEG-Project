"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "/public/Sidebar-icon/Profile Dark.svg";
import UserInfo from "./UserInfo";
import PasswordVisibilityButton from "@/app/PasswordVisibilityButton";
import { useRouter } from "next/navigation";
import { getEmailFromSessionStorage } from "@/app/auth/page";
import ResetButton from "./ResetButton";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<{
    email: string | null;
    department: string | null;
    password: string | null;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const getUserInfo = async (email: string | null) => {
    try {
      const response = await fetch("http://localhost:8000/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: email }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    sessionStorage.setItem("userEmail", "jyi1n21@soton.ac.uk");
    getUserInfo(getEmailFromSessionStorage());
  }, []);

  const handleLogout = () => {
    try {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("userEmail");
        router.replace("/");
        console.log("Email removed from session storage");
      } else {
        console.error("Session storage is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error removing email from session storage:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src={profile}
        alt="profile"
        className="w-40 h-40 rounded-full bg-gray-300 mt-3"
      />
      <label className="mt-2 mb-5 font-bold text-xl">{userInfo?.email}</label>
      {userInfo && (
        <div>
          <UserInfo
            label="Email Address"
            type="text"
            value={(userInfo as any).email}
          />
          <UserInfo
            label="Department"
            type="text"
            value={(userInfo as any).department}
          />
          <UserInfo
            type={showPassword ? "text" : "password"}
            label="Password"
            value={(userInfo as any).password}
            children={{
              editBtn: <ResetButton />,
              visibilityBtn: (
                <PasswordVisibilityButton
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              ),
            }}
          ></UserInfo>
        </div>
      )}
      <button
        type="submit"
        onClick={handleLogout}
        className="w-1/4 items-center justify-center text-white-50 px-5 py-3 text-center text-sm
        bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg"
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;
