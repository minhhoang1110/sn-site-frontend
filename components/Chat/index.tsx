import React, { useState } from "react";
import Avatar from "../Avatar";
import Icon from "@/icons";
import { CreateMessageRequestBody, RoomChat } from "@/types/DataObject";
import { useAuthentication, useUser } from "@/hooks";
import {
  getAvatarPlaceholder,
  getRoomChatUserId,
} from "@/helper/componentData";
import TextField from "../TextField";
import ListMessage from "../ListMessage";
interface Props {
  roomChat: RoomChat | null;
}
const Chat: React.FC<Props> = ({ roomChat }) => {
  const initValue: CreateMessageRequestBody = {
    roomId: roomChat?.id || 0,
    userId: 0,
    message: "",
    imageUrl: "",
  };
  const [values, setValues] = useState<CreateMessageRequestBody>(initValue);
  const { session } = useAuthentication();
  const { user, loadingUser } = useUser(
    getRoomChatUserId(roomChat?.userIds || "", session).toString()
  );
  if (loadingUser) return <></>;
  return (
    <div style={{ width: `calc(100% - 384px)` }}>
      <div className="w-full h-14 px-3 border-b shadow border-gray-300 border-solid flex items-center justify-between">
        <div className="flex items-center">
          <Avatar
            url={user?.avatarUrl || ""}
            size="md"
            placeholder={getAvatarPlaceholder(user)}
          />
          <span className={`font-bold p-1`}>
            {(user && `${user.firstName} ${user.lastName}`) || ""}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-sky-400 text-white flex items-center justify-center cursor-pointer rounded-full">
            <Icon icon="infor-circle" />
          </div>
        </div>
      </div>
      <ListMessage roomChatId={roomChat?.id || 0} />
      <div className="p-3 flex items-center">
        <div className="flex items-center justify-center text-center w-10 h-10 mr-3 cursor-pointer text-sky-600">
          <Icon icon="photo" />
        </div>
        <div style={{ width: "calc(100% - 104px)" }}>
          <TextField
            readOnly={false}
            fontSize="text-base"
            hasBorder={true}
            id="keyword"
            placeholder="Aa"
            required={false}
            type="text"
            width="w-full"
            borderRadius="rounded-full"
            padding="sm"
            background="bg-gray-300"
            values={values}
            setValues={setValues}
          />
        </div>
        <div className="flex items-center justify-center text-center w-10 h-10 ml-3 cursor-pointer text-sky-600">
          <Icon icon="paper-airplane" />
        </div>
      </div>
    </div>
  );
};
export default Chat;
