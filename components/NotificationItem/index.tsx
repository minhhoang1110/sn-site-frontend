import { Notification, User } from "@/types/DataObject";
import React from "react";
import Avatar from "../commons/Avatar";
import { getAvatarPlaceholder } from "@/helper/componentData";
import moment from "moment";
import {
  DateTimeFormat,
  NotificationTypeComment,
  NotificationTypeLike,
} from "@/configs/constants";
import { useRouter } from "next/router";
import { useAuthentication } from "@/hooks";
import { NotificationAPI } from "@/api";
interface Props {
  notification: Notification;
}
const NotificationItem: React.FC<Props> = ({ notification }) => {
  const router = useRouter();
  const { session } = useAuthentication();
  const handleOnReadNotification = () => {
    if (!session || !session.accessToken) return;
    NotificationAPI.readNotification(notification.id, session.accessToken).then(
      (res) => {
        if (res.data.success) {
          if (
            notification.type === NotificationTypeLike ||
            notification.type === NotificationTypeComment
          ) {
            router.push("/profile");
            return;
          }
          router.push(`/profile/${notification.fromUserId}`);
        }
      }
    );
  };
  const getNotificationAction = () => {
    const user: User = notification.fromUser;
    return (
      <div>
        <span className="font-bold">{`${user.firstName} ${user.lastName} `}</span>
        {notification.action}
      </div>
    );
  };
  return (
    <div
      className="flex items-center justify-between rounded-md bg-white hover:bg-gray-200 cursor-pointer p-2 mb-3"
      onClick={handleOnReadNotification}
    >
      <div className="flex items-center">
        <Avatar
          url={notification.fromUser.avatarUrl || ""}
          size="md"
          placeholder={getAvatarPlaceholder(notification.fromUser)}
        />
        <div className="ml-1">
          {getNotificationAction()}
          <div className="mt-1 text-sm">
            {moment(new Date(notification.createdAt)).format(DateTimeFormat)}
          </div>
        </div>
      </div>

      {!notification.read && (
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
      )}
    </div>
  );
};
export default NotificationItem;
