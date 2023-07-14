/* eslint-disable react-hooks/exhaustive-deps */
import { useFriendships } from "@/hooks";
import React, { useEffect } from "react";
import Loader from "../Loader";
import Link from "next/link";
import { Friendship, User } from "@/types/DataObject";
import Avatar from "../Avatar";
import { getAvatarPlaceholder } from "@/helper/componentData";
interface Props {
  user: User | null;
}
const FriendList: React.FC<Props> = ({ user }) => {
  const { friendships, friendshipsLoading, setFriendShipsParam } =
    useFriendships();
  const getHref = (friendship: Friendship): string => {
    if (!user) return "profile";
    if (user.id === friendship.firstUserId)
      return `/profile/${friendship.secondUserId}`;
    return `/profile/${friendship.firstUserId}`;
  };
  const getFriendItem = (friendship: Friendship): JSX.Element | null => {
    if (!user) return null;
    const data: User =
      user.id === friendship.firstUserId
        ? friendship.secondUser
        : friendship.firstUser;
    return (
      <>
        <Avatar
          url={data?.avatarUrl || ""}
          size="md"
          placeholder={getAvatarPlaceholder(data)}
        />
        <div className="font-bold text-xl ml-2">
          {(data && `${data.firstName} ${data.lastName}`) || ""}
        </div>
      </>
    );
  };
  useEffect(() => {
    if (user) {
      setFriendShipsParam({ userId: user.id });
    }
  }, []);
  if (friendshipsLoading) return <Loader height="h-full" width="w-full" />;
  return (
    <div className="flex items-center flex-wrap">
      {friendships &&
        friendships.length > 0 &&
        friendships.map((friendship, index) => {
          return (
            <div key={index} className="p-1 w-full md:w-1/2">
              <Link
                href={getHref(friendship)}
                className="flex items-center p-3 border border-solid border-gray-300 rounded-md"
              >
                {getFriendItem(friendship)}
              </Link>
            </div>
          );
        })}
    </div>
  );
};
export default FriendList;
