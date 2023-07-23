import React from "react";
import TextareaAutosize from "react-textarea-autosize";
interface Props {
  id: string;
  label?: string;
  placeholder: string;
  required: boolean;
  readOnly: boolean;
  hasBorder: boolean;
  hasOutline: boolean;
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
  values: any;
  setValues: any;
}
const TextAreaField: React.FC<Props> = ({
  fontSize,
  hasBorder,
  id,
  label,
  placeholder,
  required,
  width,
  background = "",
  className = "",
  borderRadius = "rounded-md",
  padding = "base",
  focusEvent,
  blurEvent,
  clickEvent,
  readOnly,
  hasOutline,
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
    <div className={`py-1.5 ${width}`}>
      {label && (
        <label className="font-bold">{`${label}${required ? "*" : ""}`}</label>
      )}
      <TextareaAutosize
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
        minRows={3}
        maxRows={20}
        className={`${hasOutline ? "outline-1" : "outline-0"} ${
          padding === "base" ? "py-3.5 px-4" : "p-2"
        } ${borderRadius} w-full ${
          hasBorder ? "border border-gray-300 border-solid" : ""
        } ${fontSize} text-black ${background} ${className}`}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onClick={handleOnClick}
        onChange={handleOnChange}
        value={(values && values[id]) || ""}
      />
    </div>
  );
};
export default TextAreaField;
