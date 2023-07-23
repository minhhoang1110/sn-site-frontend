import React from "react";
import Avatar from "../commons/Avatar";
import { useUser } from "@/hooks";
import Link from "next/link";
import { getAvatarPlaceholder } from "@/helper/componentData";
interface Props {
  userId: number;
  roomChatId: number;
  hasUnreadMessage: boolean;
}
const RoomChatItem: React.FC<Props> = ({
  userId,
  roomChatId,
  hasUnreadMessage,
}) => {
  const { user, loadingUser } = useUser(userId.toString());
  if (loadingUser) return <></>;
  return (
    <Link
      href={`/message/${roomChatId}`}
      className="w-full rounded-md p-2 my-2 flex items-center justify-between hover:bg-gray-200 cursor-pointer"
    >
      <div className="flex items-center">
        <Avatar
          url={(user && user.avatarUrl) || ""}
          size="md"
          placeholder={getAvatarPlaceholder(user)}
        />
        <span className={`font-bold p-1`}>
          {(user && `${user.firstName} ${user.lastName}`) || ""}
        </span>
      </div>
      {hasUnreadMessage && (
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
      )}
    </Link>
  );
};
export default RoomChatItem;
