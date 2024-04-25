import React, { useEffect, useState } from "react";
import { useGraphContext } from "../Context";

const Sortbars = () => {

  const { graphData, setGraphData } = useGraphContext(); 
 
  const [graphStateValue, setGraphStateValue] = useState<string>("");
  const [monthStateValue, setMonthStateValue] = useState<number>(0);
  const [yearStateValue, setYearStateValue] = useState<number>(0);
  const [isDisabledGraph, setIsDisabledGraph] = useState<boolean>(false);
  const [isDisabledMonth, setIsDisabledMonth] = useState<boolean>(false);
  const [isDisabledYear, setIsDisabledYear] = useState<boolean>(false);

  const handleMonthChange = (monthValue: number) => {
    setMonthStateValue(monthValue);
    if (monthValue != 0) {
      setIsDisabledMonth(true);
    }
  }

  const handleYearChange = (yearValue: number) => {
    setYearStateValue(yearValue);
    if (yearValue != 0) {
      setIsDisabledYear(true);
    }
  }

  const handleGraphChange = (graphValue: string, monthValue: number, yearValue: number) => {
    setGraphStateValue(graphValue);
    if (graphValue != "") {
      setIsDisabledGraph(true);
    }
  };

  useEffect(() => {
    getGraphData(graphStateValue, monthStateValue, yearStateValue)
  }, [graphStateValue, monthStateValue, yearStateValue]);

  const getGraphData = async (graphType: string, month: number, year: number) => {
    try {
      const response = await fetch(
        "http://localhost:8000/get_graph/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            GraphType: graphType,
            Month: month,
            Year: year,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setGraphData({
          graphLabels: data.labels,
          graphValues: data.data
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-full">
      <div className="w-1/2 flex items-center ml-2">

        {/* Graph Title Sortbar */}
        <select 
          className="text-base font-semibold block rounded-md py-2 pl-3 pr-10 hover:bg-gray-100 focus:outline-none cursor-pointer"
          onChange={(e) => handleGraphChange((e.target.value), monthStateValue, yearStateValue)}
        >
          <option value={""} disabled={isDisabledGraph}>Select Graph</option>
          <option value={"most"}>Most Booked Rooms</option>
          <option value={"least"}>Least Booked Rooms</option>
          <option value={"floor"}>Number of Rooms Booked Per Floor</option>
          <option value={"role"}>Number of Rooms Booked Per Role</option>
          <option value={"capacity"}>Capacity Per Bookings</option>
          <option value={"admin"}>Admin Booking Approvals</option>
          <option value={"times"}>Bookings by Time</option>
        </select>
      </div>

      <div className="w-1/2 flex justify-end items-center mr-2 space-x-4">
      
        {/* Month Sortbar */}
        <select 
          className="text-base font-semibold block rounded-md py-2 pl-3 pr-10 hover:bg-gray-100 focus:outline-none cursor-pointer"
          onChange={(e) => handleMonthChange(Number(e.target.value))}
        >
          <option value={0} disabled={isDisabledMonth}>Select Month</option>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>

        {/* Year Sortbar */}
        <select 
          className="text-base font-semibold block rounded-md py-2 pl-3 pr-10 hover:bg-gray-100 focus:outline-none cursor-pointer"
          onChange={(e) => handleYearChange(Number(e.target.value))}
        >
          <option value={0} disabled={isDisabledYear}>Select Year</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>
    
    </div>
  )
}

export default Sortbars