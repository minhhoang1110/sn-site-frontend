import React, { ReactNode, useState } from "react";
interface Props {
  children: ReactNode;
  placement: "top" | "right" | "bottom" | "left";
  text: string;
}
const Tooltip: React.FC<Props> = ({ children, placement, text }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const getTooltiplPosition = () => {
    switch (placement) {
      case "bottom":
        return "top-full left-1/2 translate-x-1/-2";
      case "top":
        return "bottom-full left-1/2 translate-x-1/-2";
      case "left":
        return "right-full top-1/2 translate-y-1/-2";
      case "right":
        return "left-full top-1/2 translate-y-1/-2";
      default:
        return "";
    }
  };
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
      <div
        className={`absolute ${getTooltiplPosition()} z-10 ${
          isHover ? "block" : "hidden"
        } px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm w-max dark:bg-gray-700`}
      >
        {text}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};
export default Tooltip;
