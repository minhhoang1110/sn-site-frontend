/* eslint-disable react/display-name */
import { DateFormat } from "@/configs/constants";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
interface Props {
  id: string;
  label?: string;
  required: boolean;
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
  background?: "bg-gray-500";
  className?: string;
  values: any;
  setValues: any;
}
const SingleDatePicker: React.FC<Props> = ({
  fontSize,
  id,
  required,
  width,
  background = "",
  className = "",
  label,
  values,
  setValues,
}) => {
  const [date, setDate] = useState<Moment | null>(moment(values[id]));
  const handleOnChange = (newValue: any) => {
    setDate(newValue);
    setValues({ ...values, [id]: newValue.toDate() });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={`py-1.5 ${width}`}>
        {label && (
          <div className="text-sm mb-1">
            <label className="font-bold">{label} *</label>
          </div>
        )}
        <DatePicker
          value={date}
          onChange={(newValue) => handleOnChange(newValue)}
          format={DateFormat}
          className={`rounded-md w-full ${fontSize} text-black ${background} ${className}`}
        />
        <input
          type="text"
          id={id}
          name={id}
          value={date?.toDate().toDateString()}
          hidden
          required={required}
          onChange={handleOnChange}
        />
      </div>
    </LocalizationProvider>
  );
};
export default SingleDatePicker;
