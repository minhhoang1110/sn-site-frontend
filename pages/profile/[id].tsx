/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "@/components/Loader";
import UserInformation from "@/components/UserInformation";
import { FriendshipStateFriend } from "@/configs/constants";
import { useCurrentProfile, useFriendship, useUser } from "@/hooks";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
const UserProfile: React.FC = () => {
  const router = useRouter();
  const id: string = (router.query.id || "") as string;
  const { user, loadingUser, loadUser } = useUser(id);
  const { profile, loadingProfile, loadProfile } = useCurrentProfile();
  const { friendship, loadFriendship } = useFriendship(id);
  useEffect(() => {
    if (id) {
      loadProfile();
      loadUser();
      loadFriendship();
    }
  }, [id]);
  if (loadingUser || loadingProfile)
    return <Loader width="w-screen" height="h-screen" />;
  return (
    <MainLayout user={profile || null} limitMaxWidth={false}>
      <div className="mt-14 py-3">
        <UserInformation
          user={user || null}
          showUpdateProfileButton={false}
          showMessageButton={true}
          showAddFriendButton={true}
          friendship={friendship}
        />
      </div>
    </MainLayout>
  );
};
export default UserProfile;
