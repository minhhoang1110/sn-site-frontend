/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TextField from "../TextField";
import { User } from "@/types/DataObject";
import { SearchObj } from "@/types/common";
import { UserAPI } from "@/api";
import { useAuthentication } from "@/hooks";
import Link from "next/link";
import Avatar from "../Avatar";
import { getAvatarPlaceholder } from "@/helper/componentData";
interface Props {}
const EditableSearchField: React.FC<Props> = ({}) => {
  const { session } = useAuthentication();
  const initValue: SearchObj = {
    keyword: "",
  };
  const [values, setValues] = useState<SearchObj>(initValue);
  const [isOpenSearchResult, setIsOpenSearchResult] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const handleClickSearchResult = () => {
    setIsOpenSearchResult(false);
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
              placeholder={getAvatarPlaceholder(user)}
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
    if (values.keyword) {
      UserAPI.getListUser(values, session?.accessToken || "").then((res) => {
        if (res.data.success) {
          setUsers(res.data.data || []);
        }
      });
    }
  }, [values]);
  return (
    <div className="w-full max-w-3xl relative my-0 mx-auto hidden lg:block">
      <div className="w-full">
        <TextField
          readOnly={false}
          fontSize="text-base"
          hasBorder={true}
          id="keyword"
          placeholder="Tìm kiếm trên SN Site"
          icon="search"
          required={false}
          type="text"
          width="w-full"
          borderRadius="rounded-full"
          padding="sm"
          background="bg-gray-300"
          focusEvent={() => setIsOpenSearchResult(true)}
          blurEvent={() => !values.keyword && setIsOpenSearchResult(false)}
          values={values}
          setValues={setValues}
        />
      </div>
      <div
        className={`w-full bg-white shadow rounded-md p-3 absolute z-10 left-0 top-full ${
          isOpenSearchResult ? "block" : "hidden"
        }`}
      >
        {searchResult()}
      </div>
    </div>
  );
};
export default EditableSearchField;
