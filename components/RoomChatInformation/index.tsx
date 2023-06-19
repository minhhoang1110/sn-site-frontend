import React from "react";
import Avatar from "../Avatar";
import { RoomChat } from "@/types/DataObject";
import { useAuthentication, useUser } from "@/hooks";
import {
  getAvatarPlaceholder,
  getRoomChatUserId,
} from "@/helper/componentData";
import Icon from "@/icons";
interface Props {
  roomChat: RoomChat | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RoomChatInformation: React.FC<Props> = ({ roomChat, open, setOpen }) => {
  const { session } = useAuthentication();
  const { user, loadingUser } = useUser(
    getRoomChatUserId(roomChat?.userIds || "", session).toString()
  );
  if (loadingUser) return <></>;
  return (
    <div
      className={`relative p-3 bg-white border-l border-gray-300 border-solid w-full max-w-sm ${
        open ? "block" : "hidden"
      }`}
    >
      <div
        className="flex lg:hidden items-center justify-center text-center w-10 h-10 mr-4 cursor-pointer absolute top-3 left-3"
        onClick={() => setOpen(false)}
      >
        <Icon icon="arrow-left" />
      </div>
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
