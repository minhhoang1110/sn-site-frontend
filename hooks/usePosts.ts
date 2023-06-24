/* eslint-disable react-hooks/exhaustive-deps */
import { ListPostParams, Post } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { PostAPI } from "@/api";
import { useDispatch } from "react-redux";
import { postsAction } from "@/actions";
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  DEFAULT_PAGE,
} from "@/configs/constants";

const usePosts = (userId: number | "") => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState<boolean>(true);
  const [scrollPostsLoading, setScrollPostsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<any>(null);
  const [offset, setOffset] = useState<number>(1);
  const { session } = useAuthentication();
  const initParam: ListPostParams = {
    userId,
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    page: DEFAULT_PAGE,
  };
  const [postsParams, setPostsParams] = useState<ListPostParams>(initParam);

  const loadPosts = () => {
    if (!session || !session.accessToken) return;
    setScrollPostsLoading(true);
    setLoadError(null);
    PostAPI.getListPost(initParam, session.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          const postsData: Post[] = res.data.data;
          setPosts(postsData);
          setPostsLoading(false);
          setScrollPostsLoading(false);
          setPostsParams((prevParam) => {
            return {
              ...prevParam,
              offset: prevParam.offset + prevParam.limit,
              page: prevParam.page + 1,
            };
          });
          dispatch(postsAction.setPostsToStore(postsData));
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
  const loadNewPosts = () => {
    if (!session || !session.accessToken) return;
    setScrollPostsLoading(true);
    setLoadError(null);
    PostAPI.getListPost(postsParams, session.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          const postsData: Post[] = res.data.data;
          if (postsData.length === 0) {
            setScrollPostsLoading(false);
            setLoadError(null);
            return;
          }
          setPosts((prevPosts) => [...prevPosts, ...postsData]);
          setPostsParams((prevParam) => {
            return {
              ...prevParam,
              offset: prevParam.offset + prevParam.limit,
              page: prevParam.page + 1,
            };
          });
          setScrollPostsLoading(false);
          setPostsLoading(false);
          dispatch(postsAction.setPostsToStore(postsData));
          return;
        }
        setPosts([]);
        setPostsLoading(true);
      })
      .catch((error) => {
        setPosts([]);
        setPostsLoading(true);
        setLoadError(error);
      });
  };
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      scrollPostsLoading
    ) {
      return;
    }
    loadNewPosts();
  };
  useEffect(() => {
    loadPosts();
  }, [session, userId]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPostsLoading]);
  return {
    posts,
    setPosts,
    postsLoading,
    setPostsLoading,
    postsParams,
    setPostsParams,
    loadPosts,
    loadError,
    setLoadError,
    offset,
    setOffset,
    scrollPostsLoading,
    setScrollPostsLoading,
  };
};
export default usePosts;
