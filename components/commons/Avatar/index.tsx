import Image from "next/image";
import React from "react";
interface Props {
  url: string;
  size?: "sm" | "md" | "lg" | "xl";
  placeholder: string;
}
const Avatar: React.FC<Props> = ({ url, size = "sm", placeholder }) => {
  const getSize = (size: string) => {
    switch (size) {
      case "sm":
        return "w-6 h-6";
      case "md":
        return "w-10 h-10";
      case "lg":
        return "w-24 h-24";
      case "xl":
        return "w-40 h-40";
      default:
        return "w-6 h-6";
    }
  };
  const getPlaceholderFontSize = (size: string) => {
    switch (size) {
      case "sm":
        return "text-xs";
      case "md":
        return "text-base";
      case "lg":
        return "text-5xl";
      case "xl":
        return "text-7xl";
      default:
        return "text-xs";
    }
  };
  const getwidthHeight = (size: string) => {
    switch (size) {
      case "sm":
        return 24;
      case "md":
        return 40;
      case "lg":
        return 96;
      case "xl":
        return 160;
      default:
        return 24;
    }
  };
  return (
    <div
      className={`overflow-hidden flex items-center justify-center cursor-pointer ${getSize(
        size
      )} rounded-full border border-white border-solid bg-gray-500`}
    >
      {url ? (
        <Image
          loader={() => url}
          src={url}
          alt=""
          width={getwidthHeight(size)}
          height={getwidthHeight(size)}
          unoptimized={true}
        />
      ) : (
        <div
          className={`font-bold text-white flex items-center justify-center bg-gray-500 w-full h-full ${getPlaceholderFontSize(
            size
          )}`}
        >
          {placeholder.trim().toUpperCase()}
        </div>
      )}
    </div>
  );
};
export default Avatar;
