import { Friendship, User } from "@/types/DataObject";
import React from "react";
import UserGeneralInformation from "../UserGeneralInformation";
import UserPosts from "../UserPosts";
import { useRouter } from "next/router";
import AboutUser from "../AboutUser";
import UserFriends from "../UserFriends";
interface Props {
  user: User | null;
  friendship: Friendship | null;
  showUpdateProfileButton: boolean;
  showAddFriendButton: boolean;
  showMessageButton: boolean;
}
const UserInformation: React.FC<Props> = ({
  user,
  showUpdateProfileButton,
  showAddFriendButton,
  showMessageButton,
  friendship,
}) => {
  const { query } = useRouter();
  const paramValue: string | string[] = (
    (query && query.view) ||
    ""
  ).toString();
  const getContentSection = () => {
    switch (paramValue) {
      case "posts":
        return <UserPosts user={user} />;
      case "":
        return <UserPosts user={user} />;
      case "about":
        return <AboutUser user={user} />;
      case "friends":
        return <UserFriends user={user} />;
      default:
        return <></>;
    }
  };
  return (
    <div className="w-full">
      <UserGeneralInformation
        user={user}
        showUpdateProfileButton={showUpdateProfileButton}
        showAddFriendButton={showAddFriendButton}
        showMessageButton={showMessageButton}
        friendship={friendship}
      />
      <div className="w-full pt-2 max-w-3xl my-0 mx-auto px-3.5 lg:px-0">
        {getContentSection()}
      </div>
    </div>
  );
};
export default UserInformation;
