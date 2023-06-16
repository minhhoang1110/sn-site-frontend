/* eslint-disable react-hooks/exhaustive-deps */
import { UserAPI } from "@/api";
import Avatar from "@/components/Avatar";
import TextField from "@/components/TextField";
import { useAuthentication } from "@/hooks";
import Icon from "@/icons";
import { User } from "@/types/DataObject";
import { SearchObj } from "@/types/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const Search: React.FC = () => {
  const { session } = useAuthentication();
  const initValue: SearchObj = {
    keyword: "",
  };
  const [values, setValues] = useState<SearchObj>(initValue);
  const [users, setUsers] = useState<User[]>([]);
  const handleClickSearchResult = () => {
    setValues(initValue);
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
      return (
        <div key={index} onClick={handleClickSearchResult}>
          <Link
            href={
              user.id == session?.user?.id ? "/profile" : `/profile/${user.id}`
            }
            className="flex items-center bg-white hover:bg-gray-300 rounded-md p-2 my-2"
          >
            <Avatar
              url={user.avatarUrl || ""}
              size="md"
              placeholder={
                (user &&
                  `${user.firstName.substring(0, 1)} ${user.lastName.substring(
                    0,
                    1
                  )}`) ||
                ""
              }
            />
            <div className="ml-2 text-left font-bold">
              {(user && `${user.firstName} ${user.lastName}`) || ""}
            </div>
          </Link>
        </div>
      );
    });
    return html;
  };
  useEffect(() => {
    if (!session || !session.accessToken || !values.keyword) return;
    UserAPI.getListUser(values, session.accessToken).then((res) => {
      if (res.data.success) {
        setUsers(res.data.data || []);
      }
    });
  }, [values]);
  return (
    <div>
      <div className="h-14 w-screen bg-white shadow-md py-1.5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center justify-center text-center w-10 h-10 mr-4"
        >
          <Icon icon="arrow-left" />
        </Link>
        <div style={{ width: "calc(100% - 112px)" }}>
          <TextField
            readOnly={false}
            fontSize="text-base"
            hasBorder={true}
            id="keyword"
            placeholder="Tìm kiếm trên SN Site"
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
        <div className="flex items-center justify-center text-center w-10 h-10 ml-4">
          <Icon icon="search" />
        </div>
      </div>
      <div
        style={{ height: "calc(100vh - 56px)" }}
        className="flex justify-center"
      >
        <div className="mx-3 my-4 w-full max-h-full overflow-auto">
          {searchResult()}
        </div>
      </div>
    </div>
  );
};
export default Search;
