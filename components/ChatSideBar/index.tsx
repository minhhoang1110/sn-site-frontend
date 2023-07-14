/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthentication, useRoomChats } from "@/hooks";
import { CreateRoomChatRequestBody, User } from "@/types/DataObject";
import { SearchObj } from "@/types/common";
import React, { useEffect, useState } from "react";
import TextField from "../TextField";
import Icon from "@/icons";
import ListRoomChat from "../ListRoomChat";
import { ChatAPI, UserAPI } from "@/api";
import { getAvatarPlaceholder } from "@/helper/componentData";
import Avatar from "../Avatar";
import { useRouter } from "next/router";
import { RoomChatTypeDefault } from "@/configs/constants";
interface Props {
  user: User | null;
}
const ChatSideBar: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const { roomchats, roomchatsLoading, loadRoomChats } = useRoomChats();
  const { session } = useAuthentication();
  const initValue: SearchObj = {
    keyword: "",
  };
  const [values, setValues] = useState<SearchObj>(initValue);
  const [users, setUsers] = useState<User[]>([]);
  const [clickSearch, setClickSearch] = useState<boolean>(false);
  const handleClickSearchResult = (user: User) => {
    if (user.chatWithSessionUser) {
      router.push(`/message/${user.roomChatId}`);
      setValues(initValue);
      return;
    }
    if (!session || !session.accessToken || !session.user) return;
    const data: CreateRoomChatRequestBody = {
      roomType: RoomChatTypeDefault,
      thumbnailUrl: "",
      userIds: `${session.user.id},${user.id}`,
    };
    ChatAPI.createRoomChat(data, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          setValues(initValue);
          router.push(`/message/${res.data.data.id}`);
        }
      })
      .catch((error) => {});
  };
  const searchResult = (): JSX.Element[] | JSX.Element | null => {
    let html: JSX.Element[] | JSX.Element | null = null;
    if (users.length === 0)
      return (
        <div className="w-full text-center">
          Không có kết quả tìm kiếm nào gần đây
        </div>
      );

    html = users.map((user, index) => {
      if (
        session &&
        session.user &&
        session.user.id !== user.id &&
        user.beFriendWidthSessionUser
      ) {
        return (
          <div key={index} onClick={() => handleClickSearchResult(user)}>
            <div className="flex items-center bg-white hover:bg-gray-300 rounded-md p-2 my-2 cursor-pointer">
              <Avatar
                url={user.avatarUrl || ""}
                size="md"
                placeholder={getAvatarPlaceholder(user)}
              />
              <div className="ml-2 text-left font-bold">
                {(user && `${user.firstName} ${user.lastName}`) || ""}
              </div>
            </div>
          </div>
        );
      }
      return <div key={index}></div>;
    });
    return html;
  };
  useEffect(() => {
    if (values.keyword) {
      UserAPI.getListUser(values, session?.accessToken || "").then((res) => {
        if (res.data.success) {
          setUsers(res.data.data || []);
        }
      });
    }
  }, [values]);
  if (roomchatsLoading) return <></>;
  return (
    <div className="p-3 pt-20 bg-white border-r border-gray-300 border-solid w-full h-full lg:max-w-sm">
      <div className="pb-3 border-b border-gray-200 border-solid">
        <h3 className="font-bold text-2xl mb-3">Chat</h3>
        <div className="w-full flex items-center mb-3">
          {clickSearch && (
            <div
              className="flex items-center justify-center text-center w-10 h-10 mr-4 cursor-pointer"
              onClick={() => setClickSearch(false)}
            >
              <Icon icon="arrow-left" />
            </div>
          )}
          <TextField
            readOnly={false}
            fontSize="text-base"
            hasBorder={true}
            id="keyword"
            icon={(!clickSearch && "search") || ""}
            placeholder="Tìm kiếm trên SN Chat"
            required={false}
            type="text"
            width="w-full"
            borderRadius="rounded-full"
            padding="sm"
            background="bg-gray-300"
            focusEvent={() => setClickSearch(true)}
            values={values}
            setValues={setValues}
          />
        </div>
      </div>
      {!clickSearch && <ListRoomChat roomchats={roomchats} />}
      {clickSearch && (
        <div className={`w-full bg-white p-3`}>{searchResult()}</div>
      )}
    </div>
  );
};
export default ChatSideBar;
