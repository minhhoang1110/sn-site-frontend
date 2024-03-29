import dynamic from "next/dynamic";
import { NotificationAPI } from "@/api";
const ListNotification = dynamic(() => import("@/components/ListNotification"));
import DocumentHead from "@/components/DocumentHead";
import Loader from "@/components/commons/Loader";
import {
  useAuthentication,
  useCurrentProfile,
  useNotifications,
} from "@/hooks";
const MainLayout = dynamic(() => import("@/layouts/MainLayout"));
import React from "react";
const NotificationPage: React.FC = () => {
  const {
    notifications,
    isNewNotification,
    loadNotifications,
    notificationsLoading,
  } = useNotifications();
  const { session } = useAuthentication();
  const { profile, loadingProfile } = useCurrentProfile();
  const handleReadAllNotification = () => {
    if (!session || !session.accessToken) return;
    NotificationAPI.readAllNotification(session.accessToken).then((res) => {
      if (res.data.success) {
        loadNotifications();
      }
    });
  };
  if (loadingProfile || notificationsLoading)
    return <Loader width="w-screen" height="h-screen" />;
  return (
    <MainLayout user={profile || null}>
      <div className="mt-14 py-3">
        <DocumentHead title="Notifications" />
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
    </MainLayout>
  );
};
export default NotificationPage;
