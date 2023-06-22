/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
import { ChatAPI } from "@/api";
import Link from "next/link";
import ImageField from "../ImageField";
import { ObjectTypeMessage } from "@/configs/constants";
interface Props {
  roomChat: RoomChat | null;
  userId: number;
  openChatInfor: boolean;
  setOpenChatInfor: React.Dispatch<React.SetStateAction<boolean>>;
  windowWidth: number;
}
const Chat: React.FC<Props> = ({
  roomChat,
  userId,
  openChatInfor,
  setOpenChatInfor,
  windowWidth,
}) => {
  const initValue: CreateMessageRequestBody = {
    roomId: roomChat?.id || 0,
    userId: userId,
    message: "",
    imageUrl: "",
  };
  const [values, setValues] = useState<CreateMessageRequestBody>(initValue);
  const { session } = useAuthentication();
  const { user, loadingUser } = useUser(
    getRoomChatUserId(roomChat?.userIds || "", session).toString()
  );
  const handleSaveMessage = (e: any) => {
    if (!session || !session.accessToken) return;
    ChatAPI.createMessage(values, session.accessToken)
      .then((res) => {
        if (res.data.success) setValues(initValue);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (!roomChat) return;
    setValues({ ...values, roomId: roomChat.id });
  }, [roomChat]);
  if (loadingUser) return <></>;
  return (
    <div
      style={{
        width: `${
          openChatInfor && windowWidth < 1024
            ? "0"
            : openChatInfor && windowWidth >= 1024
            ? "calc(100% - 384px)"
            : "100%"
        }`,
      }}
    >
      <div className="w-full h-14 px-3 border-b shadow border-gray-300 border-solid flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/message"
            className="flex lg:hidden items-center justify-center text-center w-10 h-10 mr-4 cursor-pointer mr-2"
          >
            <Icon icon="arrow-left" />
          </Link>
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
          <div
            className="w-8 h-8 bg-sky-400 text-white flex items-center justify-center cursor-pointer rounded-full"
            onClick={() => setOpenChatInfor(!openChatInfor)}
          >
            <Icon icon="infor-circle" />
          </div>
        </div>
      </div>
      <ListMessage
        roomChatId={roomChat?.id || 0}
        checkImage={values && values.imageUrl ? true : false}
      />
      {values && values.imageUrl && (
        <div className="p-3 relative">
          <div
            className="relative rounded-md flex items-center justify-center w-32 h-20 w-full border border-gray-300 border-solid bg-white bg-contain bg-center bg-no-repeat my-3"
            style={{
              backgroundImage: `url('${values && values.imageUrl}')`,
            }}
          >
            <div
              className="absolute top-0 right-0 cursor-pointer w-7 h-7 rounded-full bg-gray-400 text-white p-1 flex items-center justify-center"
              onClick={() => {
                setValues({ ...values, imageUrl: "" });
              }}
            >
              <Icon icon="x-circle" />
            </div>
          </div>
        </div>
      )}
      <div className="p-3 flex items-center">
        <div className="flex items-center justify-center text-center w-10 h-10 mr-3 cursor-pointer text-sky-600">
          {/* <Icon icon="photo" /> */}
          <ImageField
            inputType="icon"
            readOnly={false}
            fontSize="text-base"
            id="imageUrl"
            required={false}
            width="w-full"
            label=""
            values={values}
            setValues={setValues}
            objectType={ObjectTypeMessage}
          />
        </div>
        <div style={{ width: "calc(100% - 104px)" }}>
          <TextField
            readOnly={false}
            fontSize="text-base"
            hasBorder={true}
            id="message"
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
        <div
          className="flex items-center justify-center text-center w-10 h-10 ml-3 cursor-pointer text-sky-600"
          onClick={handleSaveMessage}
        >
          <Icon icon="paper-airplane" />
        </div>
      </div>
    </div>
  );
};
export default Chat;
