import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
const UserInformation = dynamic(() => import("@/components/UserInformation"));
// import UserInformation from "@/components/UserInformation";
// import { FriendshipStateFriend } from "@/configs/constants";
import { useCurrentProfile } from "@/hooks";
const MainLayout = dynamic(() => import("@/layouts/MainLayout"));
// import MainLayout from "@/layouts/MainLayout";
import React from "react";
const MyProfile: React.FC = () => {
  const { profile, loadingProfile } = useCurrentProfile();
  if (loadingProfile) return <Loader width="w-screen" height="h-screen" />;
  return (
    <MainLayout user={profile || null} limitMaxWidth={false}>
      <div className="mt-14 py-3">
        <UserInformation
          user={profile || null}
          showUpdateProfileButton={true}
          showAddFriendButton={false}
          showMessageButton={false}
          friendship={null}
        />
      </div>
    </MainLayout>
  );
};
export default MyProfile;
