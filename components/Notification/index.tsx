import { useAuthentication, useNotifications, useWindowResize } from "@/hooks";
import Icon from "@/icons";
import React, { useState } from "react";
import ListNotification from "../ListNotification";
import { useRouter } from "next/router";
import { NotificationAPI } from "@/api";
interface Props {}
const Notification: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const { notifications, isNewNotification, loadNotifications } =
    useNotifications();
  const { session } = useAuthentication();
  const { windowSize } = useWindowResize();
  const handleOnClickNotification = () => {
    if (windowSize.width >= 768) {
      setOpenNotification((prev) => !prev);
      return;
    }
    router.push("/notification");
    return;
  };
  const handleReadAllNotification = () => {
    if (!session || !session.accessToken) return;
    NotificationAPI.readAllNotification(session.accessToken).then((res) => {
      if (res.data.success) {
        loadNotifications();
      }
    });
  };
  return (
    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 relative ">
      <div
        className="w-full h-full flex items-center justify-center cursor-pointer"
        onClick={handleOnClickNotification}
      >
        <Icon icon="bell" />
      </div>
      {isNewNotification && (
        <div
          className="absolute w-4 h-4 bg-green-500 rounded-full"
          style={{ top: "-3px", right: "-3px" }}
        ></div>
      )}
      {openNotification && (
        <div className="bg-white p-3 rounded-md shadow absolute top-full right-0 w-96">
          <div
            onClick={handleReadAllNotification}
            className={`mb-3 p-2 w-fit text-left ${
              isNewNotification
                ? "cursor-pointer text-sky-600"
                : "pointer-events-none text-gray-500 cursor-not-allowed"
            }`}
          >
            <span>Đọc tất cả</span>
          </div>
          <ListNotification notifications={notifications} />
        </div>
      )}
    </div>
  );
};
export default Notification;
