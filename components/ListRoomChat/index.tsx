import React from "react";
import RoomChatItem from "../RoomChatItem";
import { RoomChat } from "@/types/DataObject";
import { useAuthentication } from "@/hooks";
import { getRoomChatUserId } from "@/helper/componentData";
interface Props {
  roomchats: RoomChat[];
}
const ListRoomChat: React.FC<Props> = ({ roomchats }) => {
  const { session } = useAuthentication();
  return (
    <div
      className="w-full overflow-auto"
      style={{ maxHeight: "calc(100% - 130px)" }}
    >
      {roomchats.length > 0 &&
        roomchats.map((roomchat, index) => (
          <RoomChatItem
            key={index}
            userId={getRoomChatUserId(roomchat.userIds, session)}
            roomChatId={roomchat.id}
          />
        ))}
    </div>
  );
};
export default ListRoomChat;
