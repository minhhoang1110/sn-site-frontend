import ChatSideBar from "@/components/ChatSideBar";
import Header from "@/components/Header";
import { User } from "@/types/DataObject";
import React, { ReactNode } from "react";
interface Props {
  children?: ReactNode;
  user: User | null;
}
const MessageLayout: React.FC<Props> = ({ children, user }) => {
  return (
    <div>
      <Header user={user || null} />
      <div className="w-full flex h-screen">
        <ChatSideBar user={user} />
        {children && children}
        {!children && (
          <div className="w-full h-full flex items-center justify-center text-xl text-gray-600 font-bold pt-14">
            Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới
          </div>
        )}
      </div>
    </div>
  );
};
export default MessageLayout;
