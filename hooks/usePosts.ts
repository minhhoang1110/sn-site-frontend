/* eslint-disable react-hooks/exhaustive-deps */
import { ListPostParams, Post } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { PostAPI } from "@/api";
import { useDispatch } from "react-redux";
import { postsAction } from "@/actions";

const usePosts = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState<boolean>(true);
  const { session } = useAuthentication();
  const [postsParams, setPostsParams] = useState<ListPostParams>({
    userId: "",
  });
  const loadPosts = () => {
    if (!session || !session.accessToken) return;
    PostAPI.getListPost(postsParams, session.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.data as Post[]);
          setPostsLoading(false);
          dispatch(postsAction.setPostsToStore(res.data.data as Post[]));
          return;
        }
        setPosts([]);
        setPostsLoading(true);
      })
      .catch((error) => {
        setPosts([]);
        setPostsLoading(true);
      });
  };
  useEffect(() => {
    loadPosts();
  }, [session, postsParams]);
  return {
    posts,
    setPosts,
    postsLoading,
    setPostsLoading,
    postsParams,
    setPostsParams,
    loadPosts,
  };
};
export default usePosts;
