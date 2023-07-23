import Icon from "@/icons";
import React from "react";
interface Props {
  type: "submit" | "button";
  text: string;
  fontSize: "text-base" | "text-lg" | "text-xl" | "text-sm" | "text-xs";
  background?: "bg-sky-600" | "bg-green-600" | "bg-gray-300";
  backgroundHover?: "bg-gray-200";
  lineHeight:
    | "leading-3"
    | "leading-4"
    | "leading-5"
    | "leading-6"
    | "leading-7"
    | "leading-8"
    | "leading-9"
    | "leading-10"
    | "leading-none";
  boldText?: boolean;
  width: "full" | "auto" | "1/2" | "1/3" | "1/4" | "3/4" | "2/5" | "3/5";
  textColor: "white" | "black" | "gray-500" | "sky-600";
  eventFuntion?: any;
  icon?: string;
}
const Button: React.FC<Props> = ({
  type,
  text,
  fontSize,
  width,
  background = "",
  backgroundHover = "",
  boldText,
  lineHeight,
  textColor,
  eventFuntion,
  icon = "",
}) => {
  const handleOnClick = (e: any) => {
    eventFuntion && eventFuntion();
  };
  return (
    <button
      onClick={handleOnClick}
      type={type}
      className={`flex items-center justify-center w-${width} px-4 ${fontSize} ${
        boldText ? "font-bold" : ""
      } ${background} hover:${
        backgroundHover ? backgroundHover : background
      } rounded-md ${lineHeight} text-${textColor}`}
    >
      {icon && (
        <div className="inline-block w-fit">
          <Icon icon={icon} />
        </div>
      )}
      {text}
    </button>
  );
};
export default Button;
