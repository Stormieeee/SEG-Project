import React from "react";

interface UserInfoFieldProps {
  label: string;
  value: string;
  type: string;
  children?: {
    editBtn?: React.ReactNode;
    visibilityBtn?: React.ReactNode;
  };
}

const UserInfoField = ({
  label,
  value,
  type,
  children,
}: UserInfoFieldProps) => {
  const { editBtn, visibilityBtn } = children || {};
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-black font-semibold px-2">{label}</div>
        {editBtn}
      </div>
      <div className="relative">
        <input
          type={type}
          className="w-[800px] h-[55px] border border-gray-300 rounded-md px-2 mt-2 mb-10 block width-500"
          value={value}
          readOnly
        />
        {visibilityBtn}
      </div>
    </div>
  );
};

export default UserInfoField;
