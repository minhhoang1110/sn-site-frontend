/* eslint-disable react-hooks/exhaustive-deps */
import { RoomChat } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { ChatAPI } from "@/api";

const useRoomChats = () => {
  const [roomchats, setRoomChats] = useState<RoomChat[]>([]);
  const [roomchatsLoading, setRoomChatsLoading] = useState<boolean>(false);
  const { session } = useAuthentication();
  const loadRoomChats = () => {
    if (!session || !session.accessToken) return;
    ChatAPI.getListRoomChat(session.accessToken)
      .then((res) => {
        if (res.data.success) {
          setRoomChats(res.data.data as RoomChat[]);
          setRoomChatsLoading(false);
          return;
        }
        setRoomChats([]);
        setRoomChatsLoading(true);
      })
      .catch((error) => {
        setRoomChats([]);
        setRoomChatsLoading(true);
      });
  };
  useEffect(() => {
    loadRoomChats();
    const interval = setInterval(() => {
      loadRoomChats();
    }, 3000);
    return () => clearInterval(interval);
  }, [session]);
  return {
    roomchats,
    setRoomChats,
    roomchatsLoading,
    setRoomChatsLoading,
    loadRoomChats,
  };
};
export default useRoomChats;
