/* eslint-disable react-hooks/exhaustive-deps */
import { Message } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { ChatAPI } from "@/api";

const useMessages = (roomId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(false);
  const { session } = useAuthentication();
  const loadMessages = (roomId: number) => {
    if (!session || !session.accessToken || !roomId) return;
    ChatAPI.getListMessage(roomId, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          const messageData: Message[] = res.data.data;
          setMessages(messageData);
          setMessagesLoading(false);
          const listMessgaeEl = document.getElementById("listMessageSection");
          if (listMessgaeEl) {
            listMessgaeEl.scrollTop = listMessgaeEl.scrollHeight;
          }
          return;
        }
        setMessages([]);
        setMessagesLoading(true);
      })
      .catch((error) => {
        setMessages([]);
        setMessagesLoading(true);
      });
  };
  useEffect(() => {
    loadMessages(roomId);
    const interval = setInterval(() => {
      loadMessages(roomId);
    }, 2000);
    return () => clearInterval(interval);
  }, [session, roomId]);
  return {
    messages,
    setMessages,
    messagesLoading,
    setMessagesLoading,
    loadMessages,
  };
};
export default useMessages;
