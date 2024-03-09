import React from "react";
import { FORM_CONTAINER } from "./ComponentFormat";
import ComponentTitle from "./ComponentTitle";

const descriptions = {
  capacity : 1,
  equipments : [
    {name : "Computer", quantity : 35},
    {name : "Microphone", quantity : 2},
    {name : "Seats", quantity : 35},
    {name : "Projector", quantity : 1}
  ]
}

const Description = () => {
  return (
    <div className={FORM_CONTAINER}>
      <div className="flex-col flex-grow h-full">
        <ComponentTitle title='3 Description' image="/Components-icon/Description Logo.svg" altImg="Datetime logo"/>
        <div className="flex">
          <div className="flex-col">
            <div>Capacity</div>
            <div>Equipment</div>
          </div>
          <div className="flex-col ml-3">
            <div>{descriptions.capacity}</div>
            <div className="flex-col">
              {descriptions.equipments.map((equipment, index) => (
              <div key={index}>
                <div>{equipment.name} x {equipment.quantity}</div>
              </div>))}
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default Description;
