import React from "react";
import Avatar from "../Avatar";
import { RoomChat } from "@/types/DataObject";
import { useAuthentication, useUser } from "@/hooks";
import {
  getAvatarPlaceholder,
  getRoomChatUserId,
} from "@/helper/componentData";
interface Props {
  roomChat: RoomChat | null;
}
const RoomChatInformation: React.FC<Props> = ({ roomChat }) => {
  const { session } = useAuthentication();
  const { user, loadingUser } = useUser(
    getRoomChatUserId(roomChat?.userIds || "", session).toString()
  );
  if (loadingUser) return <></>;
  return (
    <div className="p-3 bg-white border-l border-gray-300 border-solid w-full max-w-sm">
      <div className="w-full flex items-center flex-col">
        <Avatar
          url={user?.avatarUrl || ""}
          size="lg"
          placeholder={getAvatarPlaceholder(user)}
        />
        <span className={`font-bold p-1 text-xl`}>
          {(user && `${user.firstName} ${user.lastName}`) || ""}
        </span>
      </div>
    </div>
  );
};
export default RoomChatInformation;
