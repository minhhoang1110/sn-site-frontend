/* eslint-disable react-hooks/exhaustive-deps */
import Chat from "@/components/Chat";
import Loader from "@/components/Loader";
import RoomChatInformation from "@/components/RoomChatInformation";
import { useCurrentProfile, useRoomChat } from "@/hooks";
import MessageLayout from "@/layouts/MessageLayout";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
const RoomChat: React.FC = () => {
  const router = useRouter();
  const id: string = (router.query.id || "") as string;
  const { roomchat, roomchatLoading, loadRoomChat } = useRoomChat(id);
  const { profile, loadingProfile, loadProfile } = useCurrentProfile();
  useEffect(() => {
    if (id) {
      loadProfile();
      loadRoomChat(id);
    }
  }, [id]);
  if (loadingProfile || roomchatLoading)
    return <Loader width="w-screen" height="h-screen" />;
  return (
    <MessageLayout user={profile}>
      <div className="w-full h-full flex pt-14 bg-white">
        <Chat roomChat={roomchat} />
        <RoomChatInformation roomChat={roomchat} />
      </div>
    </MessageLayout>
  );
};
export default RoomChat;
