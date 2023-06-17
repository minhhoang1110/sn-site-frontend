import { User, UserWithToken } from "@/types/DataObject";

export const getAvatarPlaceholder = (user: User | null) => {
  return (
    (user &&
      `${user.firstName.substring(0, 1)} ${user.lastName.substring(0, 1)}`) ||
    ""
  );
};
export const getRoomChatUserId = (
  userIds: string,
  session: UserWithToken | null
) => {
  if (!session || !session.user || !userIds) return 0;
  const userIdList: string[] = userIds.split(",");
  const userId: string | undefined = userIdList.find(
    (v) => v !== session.user?.id.toString()
  );
  return parseInt(userId || "");
};
