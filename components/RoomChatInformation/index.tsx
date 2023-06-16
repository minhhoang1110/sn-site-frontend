import React from "react";
import Avatar from "../Avatar";
interface Props {}
const RoomChatInformation: React.FC<Props> = () => {
  return (
    <div className="p-3 bg-white border-l border-gray-300 border-solid w-full max-w-sm">
      <div className="w-full flex items-center flex-col">
        <Avatar url={""} size="lg" placeholder={"AB"} />
        <span className={`font-bold p-1 text-xl`}>{"Hoang TM"}</span>
      </div>
    </div>
  );
};
export default RoomChatInformation;
