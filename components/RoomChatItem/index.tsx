import React from "react";
import Avatar from "../Avatar";
import { useUser } from "@/hooks";
import Link from "next/link";
import { getAvatarPlaceholder } from "@/helper/componentData";
interface Props {
  userId: number;
  roomChatId: number;
}
const RoomChatItem: React.FC<Props> = ({ userId, roomChatId }) => {
  const { user, loadingUser } = useUser(userId.toString());
  if (loadingUser) return <></>;
  return (
    <Link
      href={`/message/${roomChatId}`}
      className="w-full rounded-md p-2 my-2 flex items-center hover:bg-gray-200 cursor-pointer"
    >
      <Avatar
        url={(user && user.avatarUrl) || ""}
        size="md"
        placeholder={getAvatarPlaceholder(user)}
      />
      <span className={`font-bold p-1`}>
        {(user && `${user.firstName} ${user.lastName}`) || ""}
      </span>
    </Link>
  );
};
export default RoomChatItem;
