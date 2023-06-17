/* eslint-disable react-hooks/exhaustive-deps */
import { RoomChat } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { ChatAPI } from "@/api";

const useRoomChat = (id: string) => {
  const [roomchat, setRoomChat] = useState<RoomChat | null>(null);
  const [roomchatLoading, setRoomChatLoading] = useState<boolean>(false);
  const { session } = useAuthentication();
  const loadRoomChat = (id: string) => {
    if (!session || !session.accessToken) return;
    ChatAPI.getRoomChatDetail(id, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          setRoomChat(res.data.data as RoomChat);
          setRoomChatLoading(false);
          return;
        }
        setRoomChat(null);
        setRoomChatLoading(true);
      })
      .catch((error) => {
        setRoomChat(null);
        setRoomChatLoading(true);
      });
  };
  useEffect(() => {
    loadRoomChat(id);
  }, [session, id]);
  return {
    roomchat,
    setRoomChat,
    roomchatLoading,
    setRoomChatLoading,
    loadRoomChat,
  };
};
export default useRoomChat;
