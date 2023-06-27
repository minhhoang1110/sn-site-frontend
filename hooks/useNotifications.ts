/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import { NotificationAPI } from "@/api";
import { Notification } from "@/types/DataObject";

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsLoading, setNotificationsLoading] =
    useState<boolean>(false);
  const [isNewNotification, setIsNewNotification] = useState<boolean>(false);
  const { session } = useAuthentication();
  const checkUnreadNotification = (data: Notification[]) => {
    for (const item of data) {
      if (!item.read) return true;
    }
    return false;
  };
  const loadNotifications = () => {
    if (!session || !session.accessToken) return;
    NotificationAPI.getListNotification(session.accessToken)
      .then((res) => {
        if (res.data.success) {
          const notificationData: Notification[] = res.data.data;
          setNotifications(notificationData);
          setNotificationsLoading(false);
          setIsNewNotification(checkUnreadNotification(notificationData));
          return;
        }
        setNotifications([]);
        setNotificationsLoading(true);
      })
      .catch((error) => {
        setNotifications([]);
        setNotificationsLoading(true);
      });
  };
  useEffect(() => {
    loadNotifications();
    const interval = setInterval(() => {
      loadNotifications();
    }, 5000);
    return () => clearInterval(interval);
  }, [session]);
  return {
    notifications,
    setNotifications,
    notificationsLoading,
    setNotificationsLoading,
    isNewNotification,
    setIsNewNotification,
    loadNotifications,
  };
};
export default useNotifications;
