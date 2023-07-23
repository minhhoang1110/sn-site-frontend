import { User } from "@/types/DataObject";
import React from "react";
import TextField from "../commons/TextField";
import Link from "next/link";
import FriendList from "../FriendList";
interface Props {
  user: User | null;
}
const UserFriends: React.FC<Props> = ({ user }) => {
  return (
    <div className="w-full bg-white p-3 rounded-md shadow-md my-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold leading-10">Bạn bè</h2>
        <div className="flex items-center">
          <div className="w-full max-w-184px mr-2">
            <TextField
              readOnly={false}
              fontSize="text-base"
              hasBorder={true}
              id="search"
              placeholder="Tìm kiếm"
              icon="search"
              required={false}
              type="text"
              width="w-full"
              borderRadius="rounded-full"
              padding="sm"
              background="bg-gray-300"
              values={null}
              setValues={null}
            />
          </div>
          <Link href="/" className="text-sky-600">
            Lời mời kết bạn
          </Link>
        </div>
      </div>
      <FriendList user={user} />
    </div>
  );
};
export default UserFriends;
