import React, { useState } from "react";
import TextField from "../TextField";
import { User } from "@/types/DataObject";
interface Props {}
const EditableSearchField: React.FC<Props> = ({}) => {
  const [isOpenSearchResult, setIsOpenSearchResult] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const searchResult = (): JSX.Element[] | JSX.Element | null => {
    let html: JSX.Element[] | JSX.Element | null = null;
    if (users.length === 0)
      return (
        <div className="w-full text-center">
          Không có kết quả tìm kiếm nào gần đây
        </div>
      );
    return html;
  };
  return (
    <div className="w-full max-w-3xl relative my-0 mx-auto">
      <div className="w-full">
        <TextField
          readOnly={false}
          fontSize="text-base"
          hasBorder={true}
          id="search"
          placeholder="Tìm kiếm trên SN Site"
          icon="search"
          required={false}
          type="text"
          width="w-full"
          borderRadius="rounded-full"
          padding="sm"
          background="bg-gray-300"
          focusEvent={() => setIsOpenSearchResult(true)}
          blurEvent={() => setIsOpenSearchResult(false)}
          values={null}
          setValues={null}
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
