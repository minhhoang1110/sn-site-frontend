import dynamic from "next/dynamic";
import DocumentHead from "@/components/DocumentHead";
import Loader from "@/components/commons/Loader";
const RequestedFriendList = dynamic(
  () => import("@/components/RequestedFriendList")
);
import { useCurrentProfile, useRequestedFriendships } from "@/hooks";
const MainLayout = dynamic(() => import("@/layouts/MainLayout"));
import React from "react";
const RequestedFriend: React.FC = () => {
  const { profile, loadingProfile } = useCurrentProfile();
  const { friendships, friendshipsLoading } = useRequestedFriendships();
  if (friendshipsLoading || loadingProfile)
    return <Loader width="w-screen" height="h-screen" />;
  return (
    <MainLayout user={profile || null}>
      <div className="mt-14 py-3">
        <DocumentHead title="Friend Request List" />
        <RequestedFriendList friendships={friendships} />
      </div>
    </MainLayout>
  );
};
export default RequestedFriend;
