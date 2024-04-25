"use client";
import React from "react";
import UploadCard from "./UploadCard";
const Upload = () => {
  const requiredFormatUsers = () => {
    return (
      <ul className="list-decimal ml-6">
        <li>Excel file (e.g. .xls, .xlsx)</li>
        <li>
          Column names:
          <ul className="list-disc ml-6">
            <li>email</li>
            <li>password</li>
            <li>user role</li>
          </ul>
        </li>
        <li>Domain of email must be '@soton.ac.uk'</li>
        <li>
          Option for user role column (1-5):
          <ul className="list-disc ml-6">
            <li>1 - Student</li>
            <li>2 - Faculty</li>
            <li>3 - SAS Staff Member</li>
            <li>4 - Property Manager</li>
            <li>5 - Administrator</li>
          </ul>
        </li>
      </ul>
    );
  };

  const requiredFormatTimetable = () => {
    return (
      <ul className="list-decimal ml-6">
        <li>Excel file (e.g. .xls, .xlsx)</li>
        <li>
          Each lecture data is 3 rows format:
          <ul className="list-disc ml-6">
            <li>Lecture name</li>
            <li>Time range (e.g. 9:00 am - 10:00 am)</li>
            <li>Lecturer name</li>
          </ul>
        </li>
        <li>X-axis: Days of the week (e.g. Monday)</li>
        <li>Y-axis: Room (e.g. 2R004)</li>
        <li>First recordable cell is "5B"</li>
        <li>No merged cells (Except x-axis & y-axis)</li>
      </ul>
    );
  };

  return (
    <div className="">
      <div className="items-start flex justify-start h-full p-20">
        <UploadCard
          title="Users"
          actionUrl="upload-excel/"
          sampleUrl="sample_users.xlsx"
          requiredFormat={requiredFormatUsers}
        />
        <UploadCard
          title="Timetable"
          actionUrl="process_excel/"
          sampleUrl="sample_timetable.xlsx"
          requiredFormat={requiredFormatTimetable}
        />
      </div>
    </div>
  );
};
export default Upload;
