import { Post } from "@/types/DataObject";
import React, { useState } from "react";
import Avatar from "../Avatar";
import Icon from "@/icons";
import Tooltip from "../Tooltip";
import moment from "moment";
import { DateTimeFormat } from "@/configs/constants";
import Button from "../Button";
import CreatePostModal from "../CreatePostModal";
import { useCurrentProfile } from "@/hooks";
interface Props {
  post: Post;
  canUpdatePost: boolean;
}
const PostItem: React.FC<Props> = ({ post, canUpdatePost }) => {
  const { profile, loadingProfile } = useCurrentProfile();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const getSharedTypeIconSection = () => {
    switch (post.sharedType) {
      case "SharedTypePublic":
        return (
          <Tooltip placement="bottom" text="Công khai">
            <Icon icon="globe" />
          </Tooltip>
        );
      case "SharedTypeFriend":
        return (
          <Tooltip placement="bottom" text="Bạn bè">
            <Icon icon="user" />
          </Tooltip>
        );
      case "SharedTypePrivate":
        return (
          <Tooltip placement="bottom" text="Riêng tư">
            <Icon icon="lock-closed" />
          </Tooltip>
        );
      default:
        break;
    }
  };
  const postedTimeAndShareType = (
    <div className="flex items-center text-gray-500">
      <span className="text-xs mr-2 ">
        {moment(new Date(post.updatedAt)).format(DateTimeFormat)}
      </span>
      <div className="scale-75 origin-left">{getSharedTypeIconSection()}</div>
    </div>
  );
  if (loadingProfile) return <></>;
  return (
    <div className="w-full bg-white p-3 rounded-md shadow-md my-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <Avatar
            url={post.user.avatarUrl || ""}
            size="md"
            placeholder={
              `${post.user.firstName.substring(
                0,
                1
              )} ${post.user.lastName.substring(0, 1)}` || ""
            }
          />
          <div className="ml-2 text-left">
            <div className="font-bold">
              {`${post.user.firstName} ${post.user.lastName}` || ""}
            </div>
            <div className="">{postedTimeAndShareType}</div>
          </div>
        </div>
        {canUpdatePost && (
          <div
            className="cursor-pointer"
            onClick={() => setOpenUpdateModal(true)}
          >
            <Tooltip placement="bottom" text="Chỉnh sửa bài viết">
              <Icon icon="pencil-square" />
            </Tooltip>
          </div>
        )}
      </div>
      <div className="text-2xl my-2 whitespace-pre-line">{post.content}</div>
      <div className="w-full flex items-center justify-between text-gray-500">
        <div className="flex items-center">
          <div className="inline-flex items-center justify-center bg-sky-600 rounded-full text-white w-5 h-5">
            <div className="scale-60 origin-center">
              <Icon icon="like" />
            </div>
          </div>
          <span className="ml-2">{post.countOfLikes}</span>
        </div>
        <div>{post.countOfComments} bình luận</div>
      </div>
      <div className="w-full border-y border-solid border-gray-300 mt-2 flex items-center py-1">
        <Button
          fontSize="text-lg"
          text="Thích"
          type="button"
          width="1/2"
          boldText
          lineHeight={"leading-8"}
          textColor="gray-500"
          backgroundHover="bg-gray-200"
          icon="like"
        />
        <Button
          fontSize="text-lg"
          text="Bình luận"
          type="button"
          width="1/2"
          boldText
          lineHeight={"leading-8"}
          textColor="gray-500"
          backgroundHover="bg-gray-200"
          icon="comment"
        />
      </div>
      <CreatePostModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        user={profile}
        post={post}
      />
    </div>
  );
};
export default PostItem;
