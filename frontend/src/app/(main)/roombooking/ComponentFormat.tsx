import Image from "next/image";

export const FORM_CONTAINER = "h-full flex-col bg-white rounded-xl border border-neutral-400 px-3 py-6";
export const WRAPPER = "flex flex-col w-1/3 px-2 mx-3"
export const FORM_LABEL = "pl-2 font-normal text-lg";
export const FORM_INPUT = "bg-blue-100 border-blue-100 rounded mr-5 my-2 py-4 px-2 text-blue-400 rounded-lg";
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