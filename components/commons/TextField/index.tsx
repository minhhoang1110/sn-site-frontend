import Icon from "@/icons";
import React from "react";
interface Props {
  type: "text" | "email" | "tel" | "password";
  id: string;
  label?: string;
  placeholder: string;
  required: boolean;
  readOnly: boolean;
  hasBorder: boolean;
  fontSize: "text-base" | "text-lg" | "text-xl" | "text-sm" | "text-xs";
  width:
    | "w-full"
    | "w-auto"
    | "w-1/2"
    | "w-1/3"
    | "w-1/4"
    | "w-3/4"
    | "w-2/5"
    | "w-3/5";
  background?: "bg-gray-300";
  className?: string;
  pattern?: string;
  borderRadius?:
    | "rounded-sm"
    | "rounded"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-xl"
    | "rounded-2xl"
    | "rounded-3xl"
    | "rounded-full";
  padding?: "base" | "sm";
  focusEvent?: any;
  blurEvent?: any;
  clickEvent?: any;
  icon?: string;
  values: any;
  setValues: any;
}
const TextField: React.FC<Props> = ({
  fontSize,
  hasBorder,
  id,
  label,
  placeholder,
  required,
  type,
  width,
  background = "",
  className = "",
  pattern,
  borderRadius = "rounded-md",
  padding = "base",
  focusEvent,
  blurEvent,
  clickEvent,
  readOnly,
  icon = "",
  values,
  setValues,
}) => {
  const handleOnFocus = () => {
    focusEvent && focusEvent();
  };
  const handleOnBlur = () => {
    blurEvent && blurEvent();
  };
  const handleOnClick = () => {
    clickEvent && clickEvent();
  };
  const handleOnChange = (e: any) => {
    const value: string = e.target.value;
    setValues({ ...values, [id]: value });
  };
  return (
    <div className={`py-1.5 ${width} relative`}>
      {label && (
        <label className="font-bold">{`${label}${required ? "*" : ""}`}</label>
      )}
      {icon && (
        <div className="absolute top-1/2 translate-y-1/-2 left-2">
          <Icon icon={icon} />
        </div>
      )}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        className={`${padding === "base" ? "py-3.5 px-4" : "p-2"} ${
          icon ? "pl-10" : ""
        } ${borderRadius} w-full ${
          hasBorder ? "border border-gray-300 border-solid" : ""
        } ${fontSize} text-black ${background} ${className}`}
        pattern={pattern}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onClick={handleOnClick}
        value={(values && values[id]) || ""}
        onChange={handleOnChange}
      />
    </div>
  );
};
export default TextField;
