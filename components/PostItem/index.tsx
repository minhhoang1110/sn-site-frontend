/* eslint-disable react-hooks/exhaustive-deps */
import { CreateLikeRequestBody, LikeObj, Post } from "@/types/DataObject";
import React, { useEffect, useState } from "react";
import Avatar from "../commons/Avatar";
import Icon from "@/icons";
import Tooltip from "../Tooltip";
import moment from "moment";
import { DateTimeFormat } from "@/configs/constants";
import Button from "../commons/Button";
import CreatePostModal from "../CreatePostModal";
import { useAuthentication, useCurrentProfile } from "@/hooks";
import { LikeAPI, PostAPI } from "@/api";
import { getAvatarPlaceholder } from "@/helper/componentData";
import Link from "next/link";
import PostItemOption from "./PostItemOption";
import Modal from "../commons/Modal";
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
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openDeletingModal, setOpenDeletingModal] = useState<boolean>(false);
  const [currentLike, setCurrentLike] = useState<LikeObj | null>(null);
  const getProfileHref = () => {
    if (!post || !session || !session.user) return "/profile";
    if (post.userId === session.user.id) return "/profile";
    return `/profile/${post?.user.id || 0}`;
  };
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
  const handleOnDeletePost = () => {
    if (!session || !session.accessToken || !post) return;
    setOpenDeletingModal(true);
    PostAPI.deletePost(post.id, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          loadPosts();
        }
        setTimeout(() => {
          setOpenDeletingModal(false);
          setOpenDeleteModal(false);
        }, 2000);
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
          <Link href={getProfileHref()}>
            <Avatar
              url={post?.user.avatarUrl || ""}
              size="md"
              placeholder={getAvatarPlaceholder(post?.user || null)}
            />
          </Link>

          <div className="ml-2 text-left">
            <div className="font-bold">
              <Link href={getProfileHref()}>
                {`${post?.user.firstName} ${post?.user.lastName}` || ""}
              </Link>
            </div>
            <div className="">{postedTimeAndShareType}</div>
          </div>
        </div>
        {canUpdatePost && (
          <PostItemOption
            handleUpdatePost={() => setOpenUpdateModal(true)}
            handleDeletePost={() => setOpenDeleteModal(true)}
          />
        )}
      </div>
      <div className="text-2xl my-2 whitespace-pre-line">
        {post?.content || ""}
      </div>
      {post && post.imageUrls && (
        <div
          className="rounded-md flex items-center justify-center min-h-240px w-full border border-gray-300 border-solid bg-white bg-contain bg-center bg-no-repeat my-3"
          style={{
            backgroundImage: `url('${post && post.imageUrls}')`,
          }}
        ></div>
      )}
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
      <Modal
        content="Bạn chắc chắn muốn xoá bài viết?"
        fontSize="lg"
        hasFooter={true}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        textAlign="center"
        handleConfirm={handleOnDeletePost}
      />
      <Modal
        content="Đang xoá bài viết"
        fontSize="base"
        hasFooter={false}
        open={openDeletingModal}
        setOpen={setOpenDeletingModal}
        textAlign="center"
      />
    </div>
  );
};
export default PostItem;
