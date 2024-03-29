"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "/public/Sidebar-icon/Profile Dark.svg";
import UserInfo from "./UserInfo";
import { useRouter } from "next/navigation";
import getEmailFromSessionStorage from "../../Components/CommonFunction";
import ResetButton from "./ResetButton";
import Link from "next/link";
import ResetPassword from "./ResetPassword";
import editIcon from "../../../../public/Login-icon/edit_icon.svg";
import Authentication from "@/app/Components/Authentication";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<{
    username: string | null;
    role: string | null;
  } | null>(null);
  const router = useRouter();
  const email = getEmailFromSessionStorage() || null;
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_profile_details/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserID: email }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // if (email) {
    getUserInfo();
    // } else {
    //   router.push("/");
    // }
  }, []);

  //Handles OTP Authentication
  const handleSuccessAuth = () => {
    setShowAuth(false);
    setShowResetPassword(true);
  };
  const handleFailedAuth = () => {
    setShowAuth(false);
    window.alert("Authentication failed");
  };
  const handleCancelAuth = () => {
    setShowAuth(false);
  };

  const handleLogout = async () => {
    if (typeof sessionStorage !== "undefined") {
      try {
        const response = await fetch("http://localhost:8000/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: email }),
        });
        if (response.ok) {
          localStorage.clear();
          sessionStorage.clear();
          setUserInfo(null);
          window.location.href = "/";
          window.history.replaceState({}, "", "/");
        } else {
          console.error("Error logging out");
        }
      } catch (error) {
        console.error("Error:", error);
      }
      console.log("Email removed from session storage");
    } else {
      console.error("Session storage is not supported in this browser.");
    }
  };
  const handleEditProfileClick = () => {
    document.getElementById("profile-picture-input")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfilePicture(event.target.files[0]);
    }
  };
  return (
    email && (
      <div className="flex flex-col items-center">
        <label htmlFor="profile-picture-input">
          <div className="relative">
            <Image
              src={
                profilePicture ? URL.createObjectURL(profilePicture) : profile
              }
              alt="profile"
              className="w-40 h-40 rounded-full bg-gray-300 mt-3"
            />
            <div
              className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 cursor-pointer"
              onClick={handleEditProfileClick}
            >
              <input
                id="profile-picture-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Image src={editIcon} alt="edit" className="w-6 h-6" />
            </div>
          </div>
        </label>
        <label className="mt-2 mb-5 font-bold text-xl">
          {userInfo?.username}
        </label>
        {userInfo && (
          <div>
            <UserInfo
              label="Email Address"
              type="text"
              value={(userInfo as any).username}
            />
            <UserInfo label="Role" type="text" value={(userInfo as any).role} />
            <UserInfo label="Password" type="password" value="********">
              <ResetButton setShowAuth={setShowAuth} />
            </UserInfo>
          </div>
        )}
        <button
          type="submit"
          onClick={() => handleLogout()}
          className="w-1/4 text-white-50 px-5 py-3 text-sm bg-blue-400 hover:bg-blue-500 font-bold rounded-lg"
        >
          Log out
        </button>
        {showResetPassword && (
          <div className="fixed inset-0 z-50 flex items-center absolute justify-center bg-black bg-opacity-50">
            <ResetPassword setShowResetPassword={setShowResetPassword} />
          </div>
        )}
        {showAuth && (
          <div className="fixed inset-0 z-50 flex items-center absolute justify-center bg-black bg-opacity-50">
            <Authentication
              handleSuccessAuth={handleSuccessAuth}
              handleFailedAuth={handleFailedAuth}
              handleCancelAuth={handleCancelAuth}
            />
          </div>
        )}
      </div>
    )
  );
};

export default Profile;
