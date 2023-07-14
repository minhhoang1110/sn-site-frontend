/* eslint-disable react-hooks/exhaustive-deps */
import { usePosts } from "@/hooks";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import PostItem from "../PostItem";
import { Post } from "@/types/DataObject";
import PostDetailModal from "../PostDetailModal";
export interface Props {
  userId?: number | "";
}
const ListPost: React.FC<Props> = ({ userId = "" }) => {
  const {
    posts,
    postsLoading,
    setPostsParams,
    loadPosts,
    scrollPostsLoading,
    loadError,
  } = usePosts(userId);
  const [selectedPost, setSelectedPost] = useState<Post>({} as Post);
  const [openPostDetailModal, setOpenPostDetailModal] =
    useState<boolean>(false);
  useEffect(() => {
    setPostsParams((prevParam) => {
      return { ...prevParam, userId };
    });
  }, [userId]);
  if (postsLoading) return <Loader width="w-full" height="h-full" />;
  return (
    <div className="w-full py-3">
      {posts.length > 0 && (
        <>
          {posts.map((post, index) => (
            <PostItem
              key={index}
              post={post}
              canUpdatePost={post.userId === userId}
              loadPosts={loadPosts}
              setSelectedPost={setSelectedPost}
              setOpenPostDetailModal={setOpenPostDetailModal}
              commentButtonEvent={true}
              borderRadius={true}
              shadow={true}
              padding={true}
            />
          ))}
          {scrollPostsLoading && <p>Đang tải...</p>}
          {loadError && <p>Error: {loadError.message}</p>}
        </>
      )}
      <PostDetailModal
        open={openPostDetailModal}
        selectedPost={selectedPost}
        setOpen={setOpenPostDetailModal}
        setSelectedPost={setSelectedPost}
        loadPosts={loadPosts}
      />
    </div>
  );
};
export default ListPost;
