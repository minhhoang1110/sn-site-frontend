import Chat from "@/components/Chat";
import Loader from "@/components/Loader";
import RoomChatInformation from "@/components/RoomChatInformation";
import { useCurrentProfile } from "@/hooks";
import MessageLayout from "@/layouts/MessageLayout";
import React from "react";
const RoomChat: React.FC = () => {
  const { profile, loadingProfile } = useCurrentProfile();
  if (loadingProfile) return <Loader width="w-screen" height="h-screen" />;
  return (
    <MessageLayout user={profile}>
      <div className="w-full h-full flex pt-14 bg-white">
        <Chat />
        <RoomChatInformation />
      </div>
    </MessageLayout>
  );
};
export default RoomChat;
