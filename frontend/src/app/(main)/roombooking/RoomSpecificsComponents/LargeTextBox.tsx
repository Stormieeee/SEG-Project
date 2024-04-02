import React, { useState } from "react";

interface LargeTextboxProps {
  setOtherSpecific: (value: string) => void;
}

const LargeTextbox: React.FC<LargeTextboxProps> = ({
  setOtherSpecific,
}: any) => {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setOtherSpecific(event.target.value);
  };
  return (
    <div>
      <textarea
      
        value={text}
        onChange={handleChange}
        className="w-full bg-gray-100 border border-gray-300 text-sm leading-tight resize-none rounded-lg p-4 focus:bg-white-50 focus:placeholder-white-50 text-black-500 "
        placeholder="Enter text here..."
      ></textarea>
    </div>
  );
};

export default LargeTextbox;
