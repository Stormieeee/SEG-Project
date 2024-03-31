import Image from "next/image";
import profile from "./default_profile_avatar.svg";

interface ProfilePictureFormProps {
  showEditForm: boolean;
  setShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProfilePictureForm = ({
  showEditForm,
  setShowEditForm,
  handleFormSubmit,
  handleFileChange,
}: ProfilePictureFormProps) => {
  return (
    <form
      id="profile-picture-form"
      className={`absolute h-full top-0 transform transition-transform duration-1000 bg-white-100 ${showEditForm ? "translate-x-0" : "translate-x-full"}`}
      style={{
        zIndex: 9999,
        // visibility: showEditForm ? "visible" : "hidden",
      }}
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col p-5 border-b border-black-100">
        <button
          className="absolute top-5 right-10"
          onClick={() => setShowEditForm(false)}
        >
          close
        </button>
        <div className="text-gray-500 text-sm" style={{ fontFamily: "arial" }}>
          Profile Settings
        </div>
        <div className="mt-1 text-3xl" style={{ fontFamily: "serif" }}>
          Change Profile Picture
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image src={profile} alt="profile" width={0} height={0} />
        <input
          id="profile-picture-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="w-1/4 text-white-50 px-5 py-3 text-sm bg-blue-400 hover:bg-blue-500 font-bold rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};
export default ProfilePictureForm;
