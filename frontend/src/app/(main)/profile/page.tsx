"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "/public/Sidebar-icon/Profile Dark.svg";
import UserInfo from "./UserInfo";
import { useRouter } from "next/navigation";
import { getEmailFromSessionStorage } from "@/app/auth/page";
import ResetButton from "./ResetButton";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<{
    email: string | null;
    role: string | null;
  } | null>(null);
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
          <UserInfo label="Role" type="text" value={(userInfo as any).role} />
          <UserInfo label="Password" type="password" value="********">
            <ResetButton />
          </UserInfo>
        </div>
      )}
      <button
        type="submit"
        onClick={handleLogout}
        className="w-1/4 text-white-50 px-5 py-3 text-sm bg-blue-400 hover:bg-blue-500 font-bold rounded-lg"
      >
        Log out
      </button>
    </div>
  );
};

export default Profile;
