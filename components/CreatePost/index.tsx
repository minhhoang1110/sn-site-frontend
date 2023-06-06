import React, { useState } from "react";
import Avatar from "../Avatar";
import { User } from "@/types/DataObject";
import TextField from "../TextField";
import CreatePostModal from "../CreatePostModal";
interface Props {
  user: User | null;
}
const CreatePost: React.FC<Props> = ({ user }) => {
  const [isOpenCreatePostModal, setIsOpenCreatePostModal] =
    useState<boolean>(false);
  return (
    <div className="w-full bg-white p-3 rounded-md shadow-md my-3 flex items-center">
      <Avatar
        url={user?.avatarUrl || ""}
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
      <div className="ml-2 w-full">
        <TextField
          readOnly={true}
          fontSize="text-base"
          hasBorder={true}
          id="createPost"
          placeholder={`${
            user && user.firstName && `${user.firstName} ơi, `
          }bạn đang nghĩ gì thế?`}
          required={false}
          type="text"
          width="w-full"
          borderRadius="rounded-full"
          padding="sm"
          background="bg-gray-300"
          clickEvent={() => setIsOpenCreatePostModal(true)}
          values={null}
          setValues={null}
        />
      </div>
      <CreatePostModal
        open={isOpenCreatePostModal}
        setOpen={setIsOpenCreatePostModal}
        user={user}
      />
    </div>
  );
};
export default CreatePost;
