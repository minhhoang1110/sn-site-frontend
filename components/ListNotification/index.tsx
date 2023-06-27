import { Notification } from "@/types/DataObject";
import React from "react";
import NotificationItem from "../NotificationItem";
interface Props {
  notifications: Notification[];
}
const ListNotification: React.FC<Props> = ({ notifications }) => {
  return (
    <div className="overflow-auto" style={{ maxHeight: "calc(100vh - 150px)" }}>
      {notifications.length > 0 &&
        notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
    </div>
  );
};
export default ListNotification;
