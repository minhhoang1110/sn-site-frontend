import { User } from "@/types/DataObject";
import React from "react";
import CreatePost from "../CreatePost";
import ListPost from "../ListPost";
interface Props {
  user: User | null;
  showCreatePostSection: boolean;
}
const UserPosts: React.FC<Props> = ({ user, showCreatePostSection }) => {
  if (!user) return <></>;
  return (
    <div>
      {showCreatePostSection && <CreatePost user={user} />}
      <ListPost userId={user.id} />
    </div>
  );
};
export default UserPosts;
