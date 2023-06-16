import React from "react";
import Avatar from "../Avatar";
interface Props {
  userId: number;
}
const RoomChatItem: React.FC<Props> = ({ userId }) => {
  return (
    <div className="w-full rounded-md p-2 my-2 flex items-center hover:bg-gray-200 cursor-pointer">
      <Avatar url={""} size="md" placeholder={"AB"} />
      <span className={`font-bold p-1`}>{"Hoang TM"}</span>
    </div>
  );
};
export default RoomChatItem;
