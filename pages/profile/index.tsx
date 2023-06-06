import Loader from "@/components/Loader";
import UserInformation from "@/components/UserInformation";
import { useCurrentProfile } from "@/hooks";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
const MyProfile: React.FC = () => {
  const { profile, loadingProfile } = useCurrentProfile();
  if (loadingProfile) return <Loader width="w-screen" height="h-screen" />;
  return (
    <MainLayout user={profile || null} limitMaxWidth={false}>
      <div className="mt-14 py-3">
        <UserInformation user={profile || null} />
      </div>
    </MainLayout>
  );
};
export default MyProfile;
