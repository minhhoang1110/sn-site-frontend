/* eslint-disable react-hooks/exhaustive-deps */
import { usePosts } from "@/hooks";
import React, { useEffect } from "react";
import Loader from "../Loader";
import PostItem from "../PostItem";
export interface Props {
  userId?: number | "";
}
const ListPost: React.FC<Props> = ({ userId = "" }) => {
  const { posts, postsLoading, setPostsParams, loadPosts } = usePosts();
  useEffect(() => {
    setPostsParams({ userId });
  }, [userId]);
  if (postsLoading) return <Loader width="w-full" height="h-full" />;
  return (
    <div className="w-full py-3">
      {posts.length > 0 &&
        posts.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            canUpdatePost={post.userId === userId}
            loadPosts={loadPosts}
          />
        ))}
    </div>
  );
};
export default ListPost;
