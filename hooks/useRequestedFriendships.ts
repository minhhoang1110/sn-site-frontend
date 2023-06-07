/* eslint-disable react-hooks/exhaustive-deps */
import { Friendship } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { FriendshipAPI } from "@/api";

const useRequestedFriendships = () => {
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [friendshipsLoading, setFriendshipsLoading] = useState<boolean>(false);
  const { session } = useAuthentication();
  const loadFriendships = () => {
    if (!session || !session.accessToken) return;
    FriendshipAPI.getListRequestedFriendship(session.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          setFriendships(res.data.data as Friendship[]);
          setFriendshipsLoading(false);
          return;
        }
        setFriendships([]);
        setFriendshipsLoading(true);
      })
      .catch((error) => {
        setFriendships([]);
        setFriendshipsLoading(true);
      });
  };
  useEffect(() => {
    loadFriendships();
  }, [session]);
  return {
    friendships,
    setFriendships,
    friendshipsLoading,
    setFriendshipsLoading,
    loadFriendships,
  };
};
export default useRequestedFriendships;
