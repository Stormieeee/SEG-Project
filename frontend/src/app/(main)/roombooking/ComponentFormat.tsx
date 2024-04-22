import Image from "next/image";

export const FORM_CONTAINER = "h-full w-full flex-col grow bg-white-50/80 backdrop-blur-lg rounded-xl border border-neutral-200 xl:px-4 xl:py-2 pb-10 md:py-1";
export const WRAPPER = "flex flex-col w-1/3 xl:mx-3 md:mx-0"
export const FORM_LABEL = "pl-2 font-normal xl:text-lg text-black-700 md:text-base pb-1";
export const FORM_INPUT = `bg-secondary-300/10 w-full rounded-md xl:my-2 xl:py-4 px-2 text-blue-500 font-medium rounded-lg text-center xl:text-base hover:cursor-pointer focus:outline-none hover:bg-secondary-200/30 duration-100
md:py-3.5 md:my-1 md:text-sm`;
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
        <span className="text-zinc-800 font-medium 2xl:text-xl px-2 items-center sm:text-lg">
          {id}
        </span>
        <span className="text-zinc-700 font-medium 2xl:text-lg items-center flex pr-2 sm:text-lg">
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