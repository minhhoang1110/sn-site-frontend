import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import { useCurrentProfile, useWindowResize } from "@/hooks";
const MessageLayout = dynamic(() => import("@/layouts/MessageLayout"));
// import MessageLayout from "@/layouts/MessageLayout";
import React, { useEffect, useState } from "react";
const Message: React.FC = () => {
  const { profile, loadingProfile } = useCurrentProfile();
  const { windowSize } = useWindowResize();
  const [isShowChatSection, setIsShowChatSection] = useState<boolean>(true);
  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsShowChatSection(false);
      return;
    }
    setIsShowChatSection(true);
  }, [windowSize.width]);
  if (loadingProfile) return <Loader width="w-screen" height="h-screen" />;
  return (
    <MessageLayout
      showChatSection={isShowChatSection}
      showSideBar={true}
      user={profile}
      windowWidth={windowSize.width}
    ></MessageLayout>
  );
};
export default Message;
