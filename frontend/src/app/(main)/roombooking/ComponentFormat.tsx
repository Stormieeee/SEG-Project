import Image from "next/image";

export const FORM_CONTAINER = "h-full flex-col bg-white-50 rounded-xl border border-neutral-400 px-4 py-2";
export const WRAPPER = "flex flex-col w-1/3 px-2 mx-3"
export const FORM_LABEL = "pl-2 font-normal text-lg text-black-700";
export const FORM_INPUT = "bg-secondary-50 border-blue-100 rounded mr-4 my-2 py-4 px-6 text-blue-500 rounded-lg text-center text-md hover:cursor-pointer ";
export const ICON = "px-1";

interface FormHeaderProps {
    id: string;
    title: string;
    imgPath: string;
    imgAlt: string;
}
export const FormHeader = ({ id, title, imgPath, imgAlt }:FormHeaderProps) => {
    return (
    <div className="flex items-center">
        <span className="text-zinc-800 font-medium text-xl px-2 items-center ">
          {id}
        </span>
        <span className="text-zinc-600 font-medium text-xl items-center flex pr-2">
          {title}
        </span>
        <Image
          src={imgPath}
          alt={imgAlt}
          className="flex w-6 h-6"
        />
      </div>
    )
}