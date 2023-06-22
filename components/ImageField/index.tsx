import React, { useRef, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import { useAuthentication } from "@/hooks";
import { FileTypeImage } from "@/configs/constants";
import { FileAPI } from "@/api";
import ListImageModal from "./ListImageModal";
import Tooltip from "../Tooltip";
import Icon from "@/icons";
interface Props {
  id: string;
  label?: string;
  required: boolean;
  readOnly: boolean;
  inputType: "icon" | "text-field";
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
  focusEvent?: any;
  blurEvent?: any;
  clickEvent?: any;
  values: any;
  setValues: any;
  objectType: string;
}
const ImageField: React.FC<Props> = ({
  fontSize,
  id,
  label,
  required,
  width,
  background = "",
  className = "",
  borderRadius = "rounded-md",
  focusEvent,
  blurEvent,
  clickEvent,
  readOnly,
  values,
  setValues,
  inputType,
  objectType,
}) => {
  const { session } = useAuthentication();
  const inputFileElement = useRef<HTMLInputElement>(null);
  const [openSelectImageModel, setOpenSelectImageModal] =
    useState<boolean>(false);
  const handleOnFocus = () => {
    focusEvent && focusEvent();
  };
  const handleOnBlur = () => {
    blurEvent && blurEvent();
  };
  const handleOnClick = () => {
    clickEvent && clickEvent();
  };
  const handleOnSelectImage = (image: string) => {
    setValues({ ...values, [id]: image });
    setOpenSelectImageModal(false);
  };
  const handleOnUploadImage = (e: any) => {
    if (!session || !session.accessToken || !session.user) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", FileTypeImage);
    formData.append("objectType", objectType);
    formData.append("userId", session.user.id.toString());
    FileAPI.uploadFile(formData, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          handleOnSelectImage((res.data.data && res.data.data.url) || "");
        }
      })
      .catch((error) => {});
  };
  return (
    <div className={`py-1.5 ${width} relative`}>
      {inputType === "text-field" && (
        <div>
          {label && (
            <label className="font-bold">{`${label}${
              required ? "*" : ""
            }`}</label>
          )}
          <div className="flex flex-col">
            <Button
              fontSize="text-base"
              lineHeight="leading-10"
              text="Chọn ảnh từ thư viện"
              textColor="black"
              type="button"
              width="full"
              background="bg-gray-300"
              eventFuntion={() => setOpenSelectImageModal(true)}
            />
            <div className="my-3">
              <Button
                fontSize="text-base"
                lineHeight="leading-10"
                text="Chọn ảnh từ thiết bị"
                textColor="black"
                type="button"
                width="full"
                background="bg-gray-300"
                eventFuntion={() =>
                  inputFileElement &&
                  inputFileElement.current &&
                  inputFileElement.current.click()
                }
              />
            </div>
            <input
              ref={inputFileElement}
              type="file"
              accept="image/*"
              id={id}
              name={id}
              placeholder={"Chọn ảnh từ thiết bị"}
              required={required}
              readOnly={readOnly}
              className={`${borderRadius} w-full border border-gray-300 border-solid my-3 ${fontSize} text-black ${background} ${className}`}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onClick={handleOnClick}
              onChange={handleOnUploadImage}
              hidden
            />
            {values && values[id] && (
              <div
                className={`${borderRadius} flex items-center justify-center min-h-240px w-full border border-gray-300 border-solid ${background} bg-contain bg-center bg-no-repeat`}
                style={{ backgroundImage: `url('${values && values[id]}')` }}
              ></div>
            )}
          </div>
        </div>
      )}
      {inputType === "icon" && (
        <div>
          <div
            className="w-fit cursor-pointer p-2"
            onClick={() =>
              inputFileElement &&
              inputFileElement.current &&
              inputFileElement.current.click()
            }
          >
            <Icon icon="photo" />
          </div>
          <input
            ref={inputFileElement}
            type="file"
            accept="image/*"
            id={id}
            name={id}
            placeholder={"Chọn ảnh từ thiết bị"}
            required={required}
            readOnly={readOnly}
            className={`${borderRadius} w-full border border-gray-300 border-solid my-3 ${fontSize} text-black ${background} ${className}`}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onClick={handleOnClick}
            onChange={handleOnUploadImage}
            hidden
          />
        </div>
      )}
      <ListImageModal
        open={openSelectImageModel}
        setOpen={setOpenSelectImageModal}
        values={values}
        setValues={setValues}
        userId={(session && session.user && session.user.id) || 0}
        handleOnSelectImage={handleOnSelectImage}
      />
    </div>
  );
};
export default ImageField;
