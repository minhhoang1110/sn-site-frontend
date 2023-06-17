/* eslint-disable react-hooks/exhaustive-deps */
import { CreateLikeRequestBody, LikeObj, Post } from "@/types/DataObject";
import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import Icon from "@/icons";
import Tooltip from "../Tooltip";
import moment from "moment";
import { DateTimeFormat } from "@/configs/constants";
import Button from "../Button";
import CreatePostModal from "../CreatePostModal";
import { useAuthentication, useCurrentProfile, usePost } from "@/hooks";
import { LikeAPI } from "@/api";
import { getAvatarPlaceholder } from "@/helper/componentData";
interface Props {
  post: Post | null;
  canUpdatePost: boolean;
  loadPosts: any;
  loadPost?: any;
  commentButtonEvent?: boolean;
  setSelectedPost?: any;
  setOpenPostDetailModal?: any;
  shadow: boolean;
  borderRadius: boolean;
  padding: boolean;
}
const PostItem: React.FC<Props> = ({
  post,
  canUpdatePost,
  loadPosts,
  commentButtonEvent,
  setOpenPostDetailModal,
  setSelectedPost,
  borderRadius,
  shadow,
  padding,
  loadPost,
}) => {
  const { profile, loadingProfile } = useCurrentProfile();
  const { session } = useAuthentication();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [currentLike, setCurrentLike] = useState<LikeObj | null>(null);
  const getSharedTypeIconSection = () => {
    if (!post) return <></>;
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
        {moment(
          new Date((post && (post.updatedAt || post.createdAt)) || "")
        ).format(DateTimeFormat)}
      </span>
      <div className="scale-75 origin-left">{getSharedTypeIconSection()}</div>
    </div>
  );
  const handleOnLike = () => {
    if (!session || !session.accessToken || !session.user) return;
    if (!currentLike) {
      const data: CreateLikeRequestBody = {
        userId: session.user.id,
        postId: post?.id || 0,
      };
      LikeAPI.createLike(data, session.accessToken)
        .then((res) => {
          if (res.data.success) {
            loadPosts();
            loadPost && loadPost(post?.id || 0);
          }
        })
        .catch((error) => {});
      return;
    }
    LikeAPI.deleteLike(currentLike.id, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          loadPosts();
          loadPost && loadPost(post?.id || 0);
        }
      })
      .catch((error) => {});
  };
  const handleCommentButton = () => {
    setSelectedPost && setSelectedPost(post);
    setOpenPostDetailModal && setOpenPostDetailModal(true);
  };
  useEffect(() => {
    if (!session || !session.user) return;
    const likes: LikeObj[] = (post && post.likes) || [];
    const userId: number = (session && session.user && session.user.id) || -1;
    const currentLike: LikeObj | undefined =
      (likes && likes.find((l) => l.userId === userId)) || undefined;
    setCurrentLike(currentLike || null);
  }, [post, session]);
  if (loadingProfile) return <></>;
  return (
    <div
      className={`w-full bg-white ${padding ? "p-3" : ""} ${
        borderRadius ? "rounded-md" : ""
      } ${shadow ? "shadow-md" : ""} my-3`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <Avatar
            url={post?.user.avatarUrl || ""}
            size="md"
            placeholder={getAvatarPlaceholder(post?.user || null)}
          />
          <div className="ml-2 text-left">
            <div className="font-bold">
              {`${post?.user.firstName} ${post?.user.lastName}` || ""}
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
      <div className="text-2xl my-2 whitespace-pre-line">
        {post?.content || ""}
      </div>
      <div className="w-full flex items-center justify-between text-gray-500">
        <div className="flex items-center">
          <div className="inline-flex items-center justify-center bg-sky-600 rounded-full text-white w-5 h-5">
            <div className="scale-60 origin-center">
              <Icon icon="like" />
            </div>
          </div>
          <span className="ml-2">{post?.countOfLikes || 0}</span>
        </div>
        <div>{post?.countOfComments || 0} bình luận</div>
      </div>
      <div className="w-full border-y border-solid border-gray-300 mt-2 flex items-center py-1">
        <Button
          fontSize="text-lg"
          text="Thích"
          type="button"
          width="1/2"
          boldText
          lineHeight={"leading-8"}
          textColor={currentLike ? "sky-600" : "gray-500"}
          backgroundHover="bg-gray-200"
          icon="like"
          eventFuntion={handleOnLike}
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
          eventFuntion={() => commentButtonEvent && handleCommentButton()}
        />
      </div>
      <CreatePostModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        user={profile}
        post={post || undefined}
      />
    </div>
  );
};
export default PostItem;
