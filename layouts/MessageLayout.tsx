import ChatSideBar from "@/components/ChatSideBar";
import Header from "@/components/Header";
import { User } from "@/types/DataObject";
import React, { ReactNode } from "react";
interface Props {
  children?: ReactNode;
  user: User | null;
  showSideBar: boolean;
  showChatSection: boolean;
  windowWidth: number;
}
const MessageLayout: React.FC<Props> = ({
  children,
  user,
  showSideBar,
  showChatSection,
  windowWidth,
}) => {
  return (
    <div>
      <Header user={user || null} />
      <div
        className={`w-full ${windowWidth < 1024 ? "block" : "flex"} h-screen`}
      >
        {showSideBar && <ChatSideBar user={user} />}
        {children && showChatSection && children}
        {!children && showChatSection && (
          <div className="w-full h-full flex items-center justify-center text-xl text-gray-600 font-bold pt-14">
            Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
          </div>
        )}
      </div>
    </div>
  );
};
export default MessageLayout;
