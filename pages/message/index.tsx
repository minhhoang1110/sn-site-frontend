import Loader from "@/components/Loader";
import { useCurrentProfile } from "@/hooks";
import MessageLayout from "@/layouts/MessageLayout";
import React from "react";
const Message: React.FC = () => {
  const { profile, loadingProfile } = useCurrentProfile();
  if (loadingProfile) return <Loader width="w-screen" height="h-screen" />;
  return <MessageLayout user={profile}></MessageLayout>;
};
export default Message;
