import React from "react";
import { FORM_CONTAINER } from "../Date and Time Components/ComponentFormat";
import ComponentTitle from "../Date and Time Components/ComponentTitle";

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
            <div className="text-zinc-600 my-5">Capacity</div>
            <div className="text-zinc-600 my-5">Equipment</div>
          </div>
          <div className="flex-col ml-3">
            <div>{descriptions.capacity}</div>
            <div className="flex-col">
              {descriptions.equipments.map((equipment, index) => (
              <div className="flex" key={index}>
                <div className="my-2 font-medium float-start">{equipment.name}</div>
                <div className=" float-end items-center">{equipment.quantity}</div>
                <span className=" float-right item-center">x</span>
              </div>))}
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default Description;
