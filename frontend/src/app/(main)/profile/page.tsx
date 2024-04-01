"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "./default_profile_avatar.svg";
import UserInfo from "./UserInfo";
import { useRouter } from "next/navigation";
import getEmailFromSessionStorage from "../../Components/CommonFunction";
import ResetButton from "./ResetButton";
import Link from "next/link";
import ResetPassword from "./ResetPassword";
import editIcon from "../../../../public/Login-icon/edit_icon.svg";
import Authentication from "@/app/Components/Authentication";
import ProfilePictureForm from "./ProfilePictureForm";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<{
    username: string | null;
    role: string | null;
  } | null>(null);
  const router = useRouter();
  let email = "";
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
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
    email = getEmailFromSessionStorage();
    getUserInfo();
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
    // document.getElementById("profile-picture-input")?.click();
    setShowEditForm(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
    }
  };
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!profilePicture) {
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", profilePicture);

    // try {
    //   const response = await fetch(
    //     "http://localhost:8000/update_profile_picture/",
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );

    //   if (response.ok) {
    //     getUserInfo();
    //     setShowEdit(false);
    //   } else {
    //     console.error("Error updating profile picture");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    setShowEditIcon(false);
  };
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative"
        onMouseEnter={() => setShowEditIcon(true)}
        onMouseLeave={() => setShowEditIcon(false)}
      >
        <Image
          src={profilePicture ? URL.createObjectURL(profilePicture) : profile}
          alt="profile"
          className="w-40 h-40 rounded-full bg-gray-300"
          width={0}
          height={0}
        />
        {showEditIcon && (
          <div
            className="absolute top-0 right-0 p-1 rounded-full bg-white-100 border border-black-800 cursor-pointer"
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
        )}
      </div>
      <label className="mt-2 mb-5 font-bold text-xl">
        {userInfo?.username}
      </label>
      {userInfo && (
        <div className="flex-1 w-4/5">
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
      <div
        className="fixed inset-0 z-50 flex bg-black-100 bg-opacity-50 justify-end"
        style={{
          visibility: showEditForm ? "visible" : "hidden",
          opacity: showEditForm ? 1 : 0,
          transition: "opacity 0.3s ease-in-out, visibility 0.6s ease-in-out",
        }}
      >
        <ProfilePictureForm
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          handleFormSubmit={handleFormSubmit}
          handleFileChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Profile;
