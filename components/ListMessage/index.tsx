import { useMessages } from "@/hooks";
import React from "react";
import MessageItem from "../MessageItem";
interface Props {
  roomChatId: number;
  checkImage?: boolean;
}
const ListMessage: React.FC<Props> = ({ roomChatId, checkImage }) => {
  const { messages, messagesLoading, loadMessages } = useMessages(roomChatId);
  if (messagesLoading)
    return (
      <div
        style={{
          height: `${checkImage ? "calc(100% - 262px)" : "calc(100% - 134px)"}`,
        }}
        className="overflow-auto"
      ></div>
    );
  return (
    <div
      style={{
        height: `${checkImage ? "calc(100% - 262px)" : "calc(100% - 134px)"}`,
      }}
      className="overflow-auto overflow-x-hidden"
    >
      {messages.length > 0 &&
        messages.map((message, index) => (
          <MessageItem key={index} message={message} />
        ))}
    </div>
  );
};
export default ListMessage;
