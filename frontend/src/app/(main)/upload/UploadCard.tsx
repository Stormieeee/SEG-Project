"use client";
import React, { useState } from "react";
import Image from "next/image";
import uploadIcon from "../../../../public/Upload-icon/Upload Icon.svg";
import downloadIcon from "../../../../public/Upload-icon/Download Icon.svg";
import removeIcon from "../../../../public/Upload-icon/Remove Icon.svg";
import { useStateContext } from "../StateContext";

const UploadCard = ({
  title,
  actionUrl,
  sampleUrl,
  requiredFormat,
}: {
  title: string;
  actionUrl: string;
  sampleUrl: string;
  requiredFormat: () => JSX.Element;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const { setMessage, setIsVisible, setIsSuccess } = useStateContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setError("");
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById(
      `file-upload-${title}`
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Clear the file input value
    }
  };

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    const confirmed = window.confirm(
      "Are you sure you want to upload this file?"
    );
    if (confirmed) {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        console.error("No file selected");
        return;
      }
      try {
        console.log("file", formData.get("file"));
        const response = await fetch(`http://localhost:8000/${actionUrl}`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
          setMessage("File uploaded successfully");
          setIsSuccess(true);
          const fileBlob = await response.blob();
          if (fileBlob) {
            downloadFile("duplicateClasses.xlsx", fileBlob);
          }
        } else {
          console.error("Error uploading file");
        }
      } catch (error) {
        setMessage("Error uploading file");
        setIsSuccess(false);
      } finally {
        setIsVisible(true);
        setSelectedFile(null);
        handleRemoveFile();
      }
    }
  };
  const downloadFile = async (filename: string, fileBlob: Blob) => {
    const url = window.URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = (filename: string) => {
    fetch(`http://localhost:8000/download_sample_excel/${filename}`)
      .then((response) => response.blob())
      .then((blob) => {
        downloadFile(filename, blob);
      })
      .catch((error) => {
        console.error("Error downloading sample Excel file:", error);
      });
  };

  return (
    <div className="flex flex-col w-1/2 h-full">
      <h2 className="text-3xl font-bold mb-4">Import {title}</h2>
      <form
        id="upload-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedFile) {
            setError("Please select a file");
            console.log("Please select a file");
            return;
          }
          formAction(e);
        }}
        className="flex flex-col items-start justify-center"
      >
        <div className="flex items-center mb-2 w-full">
          <label
            htmlFor={`file-upload-${title}`}
            className="cursor-pointer p-1 py-2 hover:bg-blue-100 border border-dashed border-black-200 text-center rounded-xl w-1/2"
          >
            <label
              htmlFor={`file-upload-${title}`}
              className="relative px-4 cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Select a file"}
              {selectedFile && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFile();
                  }}
                  className="bg-transparent text-white rounded-md absolute top-0 right-0 hover:opacity-60"
                  title="Remove the selected file"
                >
                  <Image
                    src={removeIcon}
                    alt="Remove Icon"
                    width={12}
                    height={12}
                    layout="fixed"
                  />
                </button>
              )}
            </label>
            <input
              id={`file-upload-${title}`}
              type="file"
              name="file"
              accept=".xls,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            type="submit"
            className="bg-transparent text-white p-2 rounded-md items-center justify-center mr-2 hover:opacity-60"
          >
            <Image
              src={uploadIcon}
              alt="Upload Icon"
              width={24}
              height={24}
              layout="fixed"
            />
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p className="text-sm text-gray-500 items-start flex-col w-full mt-4">
          <div className="flex items-center">
            <label className="text-lg">Required format:</label>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleDownload(sampleUrl);
              }}
              className="bg-transparent text-white p-2 rounded-md hover:opacity-80"
              title="Download a sample file"
            >
              <Image
                src={downloadIcon}
                alt="Download Icon"
                width={24}
                height={24}
                layout="fixed"
              />
            </button>
          </div>
          {requiredFormat()}
        </p>
      </form>
    </div>
  );
};

export default UploadCard;
