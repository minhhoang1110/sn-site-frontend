import React from "react";
import Avatar from "../Avatar";
import Icon from "@/icons";
interface Props {}
const Chat: React.FC<Props> = () => {
  return (
    <div style={{ width: `calc(100% - 384px)` }}>
      <div className="w-full h-14 px-3 border-b shadow border-gray-300 border-solid flex items-center justify-between">
        <div className="flex items-center">
          <Avatar url={""} size="md" placeholder={"AB"} />
          <span className={`font-bold p-1`}>{"Hoang TM"}</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-sky-400 text-white flex items-center justify-center cursor-pointer rounded-full">
            <Icon icon="infor-circle" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
