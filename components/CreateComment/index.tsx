/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthentication } from "@/hooks";
import { Comment, CreateCommentRequestBody, User } from "@/types/DataObject";
import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import TextField from "../TextField";
import Button from "../Button";
import { CommentAPI } from "@/api";
interface Props {
  comment?: Comment;
  postId: number;
  loadPosts?: any;
  loadPost?: any;
  setSelectedComment?: any;
}
const CreateComment: React.FC<Props> = ({
  postId,
  comment,
  loadPost,
  loadPosts,
  setSelectedComment,
}) => {
  const { session } = useAuthentication();
  const [user, setUser] = useState<User | null>(null);
  const initValue: CreateCommentRequestBody = {
    postId,
    userId: user?.id || 0,
    comment: comment?.comment || "",
  };
  const [values, setValues] = useState<CreateCommentRequestBody>(initValue);
  const handleOnSaveComment = (e: any) => {
    e.preventDefault();
    if (!session || !session.accessToken) return;
    if (comment) {
      CommentAPI.updateComment(
        comment?.id || 0,
        { comment: values.comment },
        session.accessToken
      )
        .then((res) => {
          if (res.data.success) {
            loadPost && loadPost(postId);
            loadPosts && loadPosts();
          }
          setValues({ ...values, comment: "" });
          setSelectedComment(null);
        })
        .catch((error) => {});
      return;
    }
    CommentAPI.createComment(values, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          loadPost && loadPost(postId);
          loadPosts && loadPosts();
        }
        setValues({ ...values, comment: "" });
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (!session || !session.user) return;
    setUser(session.user);
    setValues({ ...values, userId: session.user?.id || 0 });
    if (comment) setValues({ ...values, comment: comment?.comment || "" });
  }, [session, comment]);
  return (
    <div className="flex">
      <Avatar
        url={user?.avatarUrl || ""}
        placeholder={`${
          user?.firstName.substring(0, 1) || ""
        } ${user?.lastName.substring(0, 1)}||"`}
        size="md"
      />
      <div
        className="ml-3 bg-gray-300 p-2 rounded-md"
        style={{ width: "calc(100% - 52px)" }}
      >
        <form
          onSubmit={handleOnSaveComment}
          className="w-full flex flex-col items-end"
        >
          <div className="w-full">
            <TextField
              fontSize="text-base"
              hasBorder={false}
              id="comment"
              placeholder="Viết bình luận"
              type="text"
              readOnly={false}
              required={true}
              width="w-full"
              values={values}
              setValues={setValues}
              padding="sm"
              background="bg-gray-300"
            />
          </div>
          <div>
            <div
              className={`${
                !values.comment ? "pointer-events-none cursor-not-allowed" : ""
              }`}
            >
              <Button
                fontSize="text-base"
                text="Bình luận"
                type="submit"
                textColor="white"
                width="auto"
                background={values.comment ? "bg-sky-600" : "bg-gray-300"}
                lineHeight="leading-8"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateComment;
