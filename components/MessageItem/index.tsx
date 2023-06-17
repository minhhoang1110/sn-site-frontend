import { DateTimeFormat } from "@/configs/constants";
import { useAuthentication } from "@/hooks";
import { Message } from "@/types/DataObject";
import moment from "moment";
import React from "react";
import Avatar from "../Avatar";
import { getAvatarPlaceholder } from "@/helper/componentData";
interface Props {
  message: Message;
}
const MessageItem: React.FC<Props> = ({ message }) => {
  const { session } = useAuthentication();
  const checkMessageOwner = () => {
    if (!session || !session.user) return null;
    return message.userId === session.user.id;
  };
  return (
    <div
      className={`w-full p-3 flex ${
        checkMessageOwner() ? "justify-end" : "justify-start"
      }`}
    >
      {checkMessageOwner() && (
        <div className="max-w-1/2 overflow-hidden">
          <div className="p-3 bg-sky-500 rounded-md text-white whitespace-pre-line">
            {message.message}
          </div>
          <div className="text-sm text-gray-500">
            {moment(new Date(message.updatedAt || message.createdAt)).format(
              DateTimeFormat
            )}
            <span className="mx-1">.</span>
            <span className="cursor-pointer">Chỉnh sửa</span>
            <span className="mx-1">.</span>
            <span className="cursor-pointer">Xoá</span>
          </div>
        </div>
      )}
      {checkMessageOwner() !== null && !checkMessageOwner() && (
        <div className="max-w-1/2 overflow-hidden">
          <div className="flex items-end">
            <Avatar
              url={message.user.avatarUrl}
              placeholder={getAvatarPlaceholder(message.user)}
              size="md"
            />
            <div className="ml-2">
              <div className="p-3 bg-gray-300 rounded-md whitespace-pre-line">
                {message.message}
              </div>
              <div className="text-sm text-gray-500">
                {moment(
                  new Date(message.updatedAt || message.createdAt)
                ).format(DateTimeFormat)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MessageItem;
