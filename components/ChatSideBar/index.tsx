import { useAuthentication } from "@/hooks";
import { User } from "@/types/DataObject";
import { SearchObj } from "@/types/common";
import React, { useState } from "react";
import TextField from "../TextField";
import Icon from "@/icons";
import ListRoomChat from "../ListRoomChat";
interface Props {
  user: User | null;
}
const ChatSideBar: React.FC<Props> = ({ user }) => {
  const { session } = useAuthentication();
  const initValue: SearchObj = {
    keyword: "",
  };
  const [values, setValues] = useState<SearchObj>(initValue);
  const [users, setUsers] = useState<User[]>([]);
  const [clickSearch, setClickSearch] = useState<boolean>(false);
  const handleClickSearchResult = () => {
    setValues(initValue);
  };
  return (
    <div className="p-3 pt-20 bg-white border-r border-gray-300 border-solid w-full max-w-sm">
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
      <ListRoomChat />
    </div>
  );
};
export default ChatSideBar;
