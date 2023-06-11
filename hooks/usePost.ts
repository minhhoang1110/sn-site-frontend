/* eslint-disable react-hooks/exhaustive-deps */
import { Post } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { PostAPI } from "@/api";

const usePost = (id: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState<boolean>(true);
  const { session } = useAuthentication();
  const loadPost = (id: number) => {
    if (!session || !session.accessToken || !id) return;
    PostAPI.getPostDetail(id, session.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          setPost(res.data.data as Post);
          setPostLoading(false);
          return;
        }
        setPost(null);
        setPostLoading(true);
      })
      .catch((error) => {
        setPost(null);
        setPostLoading(true);
      });
  };
  useEffect(() => {
    loadPost(id);
  }, [session, id]);
  return {
    post,
    setPost,
    postLoading,
    setPostLoading,
    loadPost,
  };
};
export default usePost;
