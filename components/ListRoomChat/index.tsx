import React from "react";
import RoomChatItem from "../RoomChatItem";
interface Props {}
const ListRoomChat: React.FC<Props> = () => {
  return (
    <div
      className="w-full overflow-auto"
      style={{ maxHeight: "calc(100% - 130px)" }}
    >
      <RoomChatItem userId={0} />
      <RoomChatItem userId={0} />
    </div>
  );
};
export default ListRoomChat;
