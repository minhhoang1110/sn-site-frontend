import { User } from "@/types/DataObject";
import React from "react";
import CreatePost from "../CreatePost";
import ListPost from "../ListPost";
interface Props {
  user: User | null;
}
const UserPosts: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <CreatePost user={user || null} />
      <ListPost userId={user?.id || -1} />
    </div>
  );
};
export default UserPosts;
