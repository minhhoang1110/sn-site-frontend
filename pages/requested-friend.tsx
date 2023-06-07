import Loader from "@/components/Loader";
import RequestedFriendList from "@/components/RequestedFriendList";
import { useCurrentProfile, useRequestedFriendships } from "@/hooks";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
const RequestedFriend: React.FC = () => {
  const { profile, loadingProfile } = useCurrentProfile();
  const { friendships, friendshipsLoading } = useRequestedFriendships();
  if (friendshipsLoading || loadingProfile)
    return <Loader width="w-screen" height="h-screen" />;
  return (
    <MainLayout user={profile || null}>
      <div className="mt-14 py-3">
        <RequestedFriendList friendships={friendships} />
      </div>
    </MainLayout>
  );
};
export default RequestedFriend;
