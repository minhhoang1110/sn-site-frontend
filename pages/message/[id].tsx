/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from "next/dynamic";
const Chat = dynamic(() => import("@/components/Chat"));
// import Chat from "@/components/Chat";
import Loader from "@/components/Loader";
const RoomChatInformation = dynamic(
  () => import("@/components/RoomChatInformation")
);
// import RoomChatInformation from "@/components/RoomChatInformation";
import { useCurrentProfile, useRoomChat, useWindowResize } from "@/hooks";
const MessageLayout = dynamic(() => import("@/layouts/MessageLayout"));
// import MessageLayout from "@/layouts/MessageLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const RoomChat: React.FC = () => {
  const router = useRouter();
  const id: string = (router.query.id || "") as string;
  const { roomchat, roomchatLoading, loadRoomChat } = useRoomChat(id);
  const { profile, loadingProfile, loadProfile } = useCurrentProfile();
  const [openChatInfor, setOpenChatInfor] = useState<boolean>(false);
  const [isShowSideBar, setIsShowSideBar] = useState<boolean>(true);
  const { windowSize } = useWindowResize();
  useEffect(() => {
    if (id) {
      loadProfile();
      loadRoomChat(id);
    }
  }, [id]);
  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsShowSideBar(false);
      return;
    }
    setIsShowSideBar(true);
  }, [windowSize.width]);
  if (loadingProfile || roomchatLoading)
    return <Loader width="w-screen" height="h-screen" />;
  return (
    <MessageLayout
      user={profile}
      showChatSection={true}
      showSideBar={isShowSideBar}
      windowWidth={windowSize.width}
    >
      <div className="w-full h-full flex pt-14 bg-white">
        <Chat
          roomChat={roomchat}
          userId={profile?.id || 0}
          openChatInfor={openChatInfor}
          setOpenChatInfor={setOpenChatInfor}
          windowWidth={windowSize.width}
        />
        <RoomChatInformation
          roomChat={roomchat}
          open={openChatInfor}
          setOpen={setOpenChatInfor}
        />
      </div>
    </MessageLayout>
  );
};
export default RoomChat;
