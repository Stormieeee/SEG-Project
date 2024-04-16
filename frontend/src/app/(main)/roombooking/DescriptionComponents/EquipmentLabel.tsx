import React from "react";

interface EquipmentTuple {
  name: string;
  amount: number;
}

interface EquipmentProps {
  equipment: EquipmentTuple[];
}

const EquipmentLabel: React.FC<EquipmentProps> = ({ equipment }) => {
  return (
    <div className="flex flex-row">
      <div>
        <label className="text-sm pr-4">Equipment</label>
      </div>

      <div className="flex flex-grow flex-col">
        {equipment ? (
          <>
            {equipment.map((eqpt, index) => (
              <div key={index} className="flex flex-row">
                <div className="w-1/2">
                  <label className="text-sm font-semibold">{eqpt.name}</label>
                </div>

                <div className="w-1/2">
                  <label className="text-sm text-gray-400">x </label>
                  <label className="text-sm text-gray-400">{eqpt.amount}</label>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="bg-black-500">
            <span className="text-black-50" >Equipment Unavailable</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentLabel;
