import React, { useState } from "react";
import RectangularCheckbox from "./RectangularCheckbox";
import CapacityInput from "./CapacityInputBox";
import LargeTextbox from "./LargeTextBox";
import { FORM_CONTAINER, FormHeader } from "../ComponentFormat";
import roomspecificlogo from "/public/Components-icon/Room Specifics Logo.svg";

interface RoomSpecificsProps {
  setCapacity: (capacity: number) => void;
  setSpecifics: (capacity: string) => void;
}

const RoomSpecifics: React.FC<RoomSpecificsProps> = ({
  setCapacity,
  setSpecifics,
}) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [othersChecked, setOthersChecked] = useState(false);
  const [otherSpecific, setOtherSpecific] = useState("");

  const handleCheckboxChange = (label: string) => {
    if (label === "Others") {
      setOthersChecked(!othersChecked);
      if (selectedCheckbox === "Others") {
        setSelectedCheckbox("");
      } else {
        setSelectedCheckbox(otherSpecific);
      }
    } else {
      setSelectedCheckbox(label === selectedCheckbox ? "" : label);
      setSpecifics(label);
      setOthersChecked(false);
    }
  };

  return (
    <div className={FORM_CONTAINER}>
      <div className="flex items-center flex-row mt-4">
        <FormHeader
          id="2"
          title="Room Specifics"
          imgPath={roomspecificlogo}
          imgAlt="Room Specific Logo"
        />
      </div>

      <div className="flex xl:py-6 md:py-0 ">
        <div className="w-1/2 flex flex-col mt-4">
          {["Lecture", "Study", "Presentation", "Events", "Meetings"].map(
            (label) => (
              <RectangularCheckbox
                key={label}
                label={label}
                checked={label === selectedCheckbox}
                onChange={() => handleCheckboxChange(label)}
              />
            )
          )}
        </div>

        <div className="w-1/2 mt-5 flex flex-col">
          <div className="ml-2">
            <CapacityInput setCapacity={setCapacity} />
          </div>

          <div className="mt-16 flex flex-col">
            <RectangularCheckbox
              label="Others"
              checked={othersChecked}
              onChange={() => handleCheckboxChange("Others")}
            />
            {othersChecked && (
              <LargeTextbox setOtherSpecific={setOtherSpecific} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSpecifics;
