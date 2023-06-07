/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { User } from "@/types/DataObject";
import { UserAPI } from "@/api";

const useCurrentProfile = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  const { session } = useAuthentication();
  const loadProfile = () => {
    if (!session || !session.accessToken) return;
    UserAPI.currentProfile(session.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          setProfile(res.data.data as User);
          setLoadingProfile(false);
          return;
        }
        setProfile(null);
        setLoadingProfile(true);
      })
      .catch((error) => {
        setProfile(null);
        setLoadingProfile(true);
      });
  };
  useEffect(() => loadProfile(), [session]);
  return {
    profile,
    setProfile,
    loadingProfile,
    setLoadingProfile,
    loadProfile,
  };
};
export default useCurrentProfile;
