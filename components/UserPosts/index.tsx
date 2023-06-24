import { User } from "@/types/DataObject";
import React from "react";
import CreatePost from "../CreatePost";
import ListPost from "../ListPost";
interface Props {
  user: User | null;
}
const UserPosts: React.FC<Props> = ({ user }) => {
  if (!user) return <></>;
  return (
    <div>
      <CreatePost user={user} />
      <ListPost userId={user.id} />
    </div>
  );
};
export default UserPosts;
