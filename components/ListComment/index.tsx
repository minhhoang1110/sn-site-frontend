import { Comment } from "@/types/DataObject";
import React from "react";
import CommentItem from "../CommentItem";
interface Props {
  comments: Comment[];
  setSelectedComment: any;
  loadPost: any;
  loadPosts: any;
}
const ListComment: React.FC<Props> = ({
  comments = [],
  setSelectedComment,
  loadPost,
  loadPosts,
}) => {
  return (
    <div className="py-2">
      {!comments || comments.length === 0 ? (
        <div className="text-center text-gray-600 pb-2">
          Hãy là người đầu tiên bình luận vào bài viết
        </div>
      ) : (
        comments.map((comment, index) => (
          <CommentItem
            key={index}
            comment={comment}
            setSelectedComment={setSelectedComment}
            loadPost={loadPost}
            loadPosts={loadPosts}
          />
        ))
      )}
    </div>
  );
};
export default ListComment;
