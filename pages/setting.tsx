import ChangePassword from "@/components/ChangePassword";
import Loader from "@/components/Loader";
import UserSetting from "@/components/UserSetting";
import { useCurrentProfile } from "@/hooks";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
const Setting: React.FC = () => {
  const { profile, loadingProfile, loadProfile } = useCurrentProfile();
  if (loadingProfile) return <Loader width="w-screen" height="h-screen" />;
  return (
    <MainLayout user={profile}>
      <div className="mt-14 py-3">
        <UserSetting user={profile} loadProfile={loadProfile} />
        <ChangePassword />
      </div>
    </MainLayout>
  );
};
export default Setting;
