import Image from "next/image";

export const FORM_CONTAINER = "h-full w-full flex-col grow bg-white-50/80 backdrop-blur-lg rounded-xl border border-neutral-200 px-4 py-2 pb-10";
export const WRAPPER = "flex flex-col w-1/3  mx-3"
export const FORM_LABEL = "pl-2 font-normal text-lg text-black-700";
export const FORM_INPUT = "bg-secondary-300/10 w-full rounded-md my-2 py-4 text-blue-500 font-medium rounded-lg text-center text-md hover:cursor-pointer focus:outline-none hover:bg-secondary-200/30 duration-100";
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
        <span className="text-zinc-800 font-medium text-xl px-2 items-center  ">
          {id}
        </span>
        <span className="text-zinc-700 font-medium text-lg items-center flex pr-2">
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