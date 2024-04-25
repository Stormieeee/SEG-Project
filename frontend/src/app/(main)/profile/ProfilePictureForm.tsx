import Image from "next/image";
import profile from "./default_profile_avatar.svg";
import getEmailFromSessionStorage from "@/app/Components/CommonFunction";
import { useEffect, useRef, useState } from "react";

interface ProfilePictureFormProps {
  showEditForm: boolean;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  getUserInfo: () => void;
  profilePicture: string | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<string | null>>;
  originalProfilePicture: string | null;
  setOriginalProfilePicture: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

const ProfilePictureForm = ({
  showEditForm,
  setShowEditForm,
  getUserInfo,
  profilePicture,
  setProfilePicture,
  originalProfilePicture,
  setOriginalProfilePicture,
}: ProfilePictureFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [saveable, setSaveable] = useState<boolean>(false);
  const [deleteable, setDeleteable] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveable(true);
    setDeleteable(true);
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProfilePicture(URL.createObjectURL(file));
      event.target.value = "";
    }
  };

  useEffect(() => {
    setDeleteable(profilePicture !== profile);
  }, [profilePicture]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = getEmailFromSessionStorage();

    if (deleteable && selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(
          `http://localhost:8000/update_profile_pic/?user_id=${userId}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          setOriginalProfilePicture(URL.createObjectURL(selectedFile));
          setShowEditForm(false);
        } else {
          console.error("Error updating profile picture");
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:8000/delete_profile_pic/?user_id=${userId}`,
          {
            method: "POST",
          }
        );

        if (response.ok) {
          setOriginalProfilePicture(profile);
          setShowEditForm(false);
        } else {
          console.error("Error deleting profile picture");
        }
      } catch (error) {
        console.error("Error deleting profile picture:", error);
      }
    }
    setSaveable(false);
  };

  const handleCloseEditForm = () => {
    if (originalProfilePicture !== profilePicture) {
      setProfilePicture(originalProfilePicture);
    }
    if (profilePicture === profile) {
      setDeleteable(false);
    }
    setShowEditForm(false);
    setSaveable(false);
  };
  const handleDelete = () => {
    setProfilePicture(profile);
    setSaveable(true);
  };
  // Close form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const form = document.getElementById("profile-picture-form");
      if (form && !form.contains(event.target as Node)) {
        handleCloseEditForm();
      }
    };

    if (showEditForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditForm]);

  return (
    <form
      id="profile-picture-form"
      className={`absolute h-full top-0 transform transition-transform duration-1000 bg-white-100 ${
        showEditForm ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        zIndex: 9999,
      }}
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col p-5 border-b border-black-100">
        <div className="flex justify-between items-center">
          <button
            className="hover:opacity-60 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleCloseEditForm();
            }}
          >
            <Image
              src="/Profile-icon/close.svg"
              alt="close"
              width={30}
              height={30}
              layout="fixed"
            />
          </button>
          <div
            className="text-gray-500 text-md"
            style={{ fontFamily: "arial" }}
          >
            Profile Settings
          </div>
        </div>
        <div className="mt-1 text-3xl" style={{ fontFamily: "serif" }}>
          Change Profile Picture
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="relative justify-center flex w-full">
          <div className="relative w-60 h-60 mt-10 mb-5">
            <Image
              src={profilePicture === null ? profile : profilePicture}
              alt="profile"
              className="rounded-full border border-black-100 object-cover w-full h-full"
              width={160}
              height={160}
            />
          </div>
          {deleteable && (
            <button
              className="absolute top-0 right-8 top-3 hover:opacity-60 bg-white-100 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              <Image
                src="/Profile-icon/delete.svg"
                alt="delete"
                width={30}
                height={30}
                layout="fixed"
              />
            </button>
          )}
        </div>
        <input
          type="file"
          id="profile-picture-input"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          name="profile_picture"
          placeholder="Select a profile picture"
          style={{ display: "none" }}
        />
        <button
          className="bg-white mb-5 text-blue-400 hover:text-blue-500 hover:bg-blue-100 border border-blue-400 rounded-md py-2 px-4 transition duration-300 ease-in-out"
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            fileInputRef.current?.click(); // Open file input
          }}
        >
          Change Profile Picture
        </button>
        {saveable && (
          <button
            type="submit"
            className="w-1/4 text-white-50 px-5 py-3 text-sm bg-blue-400 hover:bg-blue-500 font-bold rounded-lg"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfilePictureForm;
