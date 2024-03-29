import { Comment, User } from "@/types/DataObject";
import React from "react";
import Avatar from "../commons/Avatar";
import moment from "moment";
import { DateTimeFormat } from "@/configs/constants";
import { useAuthentication } from "@/hooks";
import { CommentAPI } from "@/api";
import { getAvatarPlaceholder } from "@/helper/componentData";
import Link from "next/link";
interface Props {
  comment: Comment;
  setSelectedComment: any;
  loadPost: any;
  loadPosts: any;
}
const CommentItem: React.FC<Props> = ({
  comment,
  setSelectedComment,
  loadPost,
  loadPosts,
}) => {
  const { session } = useAuthentication();
  const user: User = comment.user;
  const getProfileHref = () => {
    if (!user || !session || !session.user) return "/profile";
    if (user.id === session.user.id) return "/profile";
    return `/profile/${user.id || 0}`;
  };
  const handleOnDeleteComment = () => {
    if (!session || !session.accessToken) return;
    CommentAPI.deleteComment(comment.id, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          loadPost && loadPost(comment.postId);
          loadPosts && loadPosts();
        }
        setSelectedComment && setSelectedComment(null);
      })
      .catch((error) => {});
  };
  return (
    <div className="flex py-2">
      <Link href={getProfileHref()}>
        <Avatar
          url={user.avatarUrl}
          placeholder={getAvatarPlaceholder(user)}
          size="md"
        />
      </Link>
      <div className="ml-3" style={{ maxWidth: "calc(100% - 52px)" }}>
        <div className="bg-gray-300 p-3 rounded-md">
          <div className="font-bold mb-1">{`${user.firstName} ${user.lastName}`}</div>
          <div className="whitespace-pre-line">{comment.comment}</div>
        </div>
        <div className="text-sm text-gray-500">
          {moment(new Date(comment.updatedAt || comment.createdAt)).format(
            DateTimeFormat
          )}
          {session && session.user && session.user.id === user.id && (
            <>
              <span className="mx-1">.</span>
              <span
                className="cursor-pointer"
                onClick={() =>
                  setSelectedComment && setSelectedComment(comment)
                }
              >
                Chỉnh sửa
              </span>
              <span className="mx-1">.</span>
              <span className="cursor-pointer" onClick={handleOnDeleteComment}>
                Xoá
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommentItem;
