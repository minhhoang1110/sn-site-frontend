import React, { useEffect, useState } from "react";
import RoomChatItem from "../RoomChatItem";
import { RoomChat } from "@/types/DataObject";
import { useAuthentication } from "@/hooks";
import { getRoomChatUserId } from "@/helper/componentData";
import { useRouter } from "next/router";
interface Props {
  roomchats: RoomChat[];
}
const ListRoomChat: React.FC<Props> = ({ roomchats }) => {
  const router = useRouter();
  const idParam: string = (router.query.id || "") as string;
  const { session } = useAuthentication();
  const [roomChatIdQuery, setRoomChatIdQuery] = useState<number>(0);
  useEffect(() => {
    if (idParam) {
      setRoomChatIdQuery(parseInt(idParam));
    }
  }, [idParam]);
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
            hasUnreadMessage={
              roomChatIdQuery && roomChatIdQuery === roomchat.id
                ? false
                : roomchat.hasUnreadMessage
            }
          />
        ))}
    </div>
  );
};
export default ListRoomChat;
