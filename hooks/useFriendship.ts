/* eslint-disable react-hooks/exhaustive-deps */
import { Friendship } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { FriendshipAPI } from "@/api";

const useFriendship = (userId: string) => {
  const [friendship, setFriendship] = useState<Friendship | null>(null);
  const [friendshipLoading, setFriendshipLoading] = useState<boolean>(false);
  const { session } = useAuthentication();
  const loadFriendship = () => {
    if (!userId || !session || !session.accessToken) return;
    FriendshipAPI.getFriendshipDetail(userId, session.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          setFriendship(res.data.data as Friendship);
          setFriendshipLoading(false);
          return;
        }
        setFriendship(null);
        setFriendshipLoading(true);
      })
      .catch((error) => {
        setFriendship(null);
        setFriendshipLoading(true);
      });
  };
  useEffect(() => {
    loadFriendship();
  }, [userId, session]);
  return {
    friendship,
    setFriendship,
    friendshipLoading,
    setFriendshipLoading,
    loadFriendship,
  };
};
export default useFriendship;
