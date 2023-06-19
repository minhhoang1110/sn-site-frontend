/* eslint-disable react-hooks/exhaustive-deps */
import { Friendship, ListFriendShipParam } from "@/types/DataObject";
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { FriendshipAPI } from "@/api";

const useFriendships = () => {
  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [friendshipsLoading, setFriendshipsLoading] = useState<boolean>(false);
  const [friendshipsParam, setFriendShipsParam] = useState<ListFriendShipParam>(
    { userId: null }
  );
  const { session } = useAuthentication();
  const loadFriendships = () => {
    if (!session || !session.accessToken) return;
    FriendshipAPI.getListFriendship(friendshipsParam, session.accessToken || "")
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
  }, [session, friendshipsParam]);
  return {
    friendships,
    setFriendships,
    friendshipsLoading,
    setFriendshipsLoading,
    loadFriendships,
    friendshipsParam,
    setFriendShipsParam,
  };
};
export default useFriendships;
