import Header from "@/components/Header";
import { User } from "@/types/DataObject";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  user: User | null;
  limitMaxWidth?: boolean;
}
const MainLayout: React.FC<Props> = ({
  children,
  user,
  limitMaxWidth = true,
}) => {
  return (
    <div>
      <Header user={user || null} />
      <div
        className={`w-full ${
          limitMaxWidth ? "max-w-3xl px-3.5 lg:px-0" : ""
        } my-0 mx-auto`}
      >
        {children}
      </div>
    </div>
  );
};
export default MainLayout;
