/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { User } from "@/types/DataObject";
import { UserAPI } from "@/api";

const useUser = (id: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const { session } = useAuthentication();
  const loadUser = () => {
    if (!id || !session || !session.accessToken) return;
    UserAPI.getUserDetail(id, session.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data as User);
          setLoadingUser(false);
          return;
        }
        setUser(null);
        setLoadingUser(true);
      })
      .catch((error) => {
        setUser(null);
        setLoadingUser(true);
      });
  };
  useEffect(() => loadUser(), [session, id]);
  return {
    user,
    setUser,
    loadingUser,
    setLoadingUser,
    loadUser,
  };
};
export default useUser;
