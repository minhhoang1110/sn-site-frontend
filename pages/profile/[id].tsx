import Loader from "@/components/Loader";
import UserInformation from "@/components/UserInformation";
import { FriendshipStateFriend } from "@/configs/constants";
import { useCurrentProfile, useFriendship, useUser } from "@/hooks";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";
import React from "react";
const UserProfile: React.FC = () => {
  const router = useRouter();
  const id: string = router.query.id as string;
  const { user, loadingUser } = useUser(id);
  const { profile, loadingProfile } = useCurrentProfile();
  const { friendship } = useFriendship(id);
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
