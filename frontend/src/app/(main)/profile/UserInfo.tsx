import React from "react";

interface UserInfoFieldProps {
  label: string;
  value: string;
  type: string;
  children?: React.ReactNode;
}

const UserInfoField = ({
  label,
  value,
  type,
  children,
}: UserInfoFieldProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-black font-semibold px-2">{label}</div>
        {children}
      </div>
      <input
        type={type}
        className="w-full h-[55px] border border-gray-300 rounded-md px-2 mt-2 mb-10 block pointer-events-none"
        value={value}
        readOnly
      />
    </div>
  );
};

export default UserInfoField;
