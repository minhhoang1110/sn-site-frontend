import { SelectOption, TabData } from "@/types/common";

export const DEFAULT_LIMIT: number = 10;
export const DEFAULT_OFFSET: number = 0;
export const DEFAULT_PAGE: number = 0;
export const POST_SHARED_TYPE_OPTION: SelectOption[] = [
  {
    key: "SharedTypePublic",
    value: "Công khai",
  },
  {
    key: "SharedTypeFriend",
    value: "Bạn bè",
  },
  {
    key: "SharedTypePrivate",
    value: "Riêng tư",
  },
];
export const PROFILE_TABS_DATA: TabData[] = [
  {
    text: "Bài viết",
    paramValue: "posts",
  },
  {
    text: "Giới thiệu",
    paramValue: "about",
  },
  {
    text: "Bạn bè",
    paramValue: "friends",
  },
];
export const DateFormat: string = "DD/MM/YYYY";
export const DateTimeFormat: string = "HH:mm, DD/MM/YYYY";
export const FriendshipStateRequested: string = "StateRequested";
export const FriendshipStateFriend: string = "StateFriend";
export const RoomChatTypeDefault: string = "RoomTypeDefault";
export const RoomChatTypeGroup: string = "RoomTypeGroup";
export const ObjectTypeUserAvatar: string = "ObjectTypeUserAvatar";
export const ObjectTypeUserCover: string = "ObjectTypeUserCover";
export const ObjectTypeRoomChat: string = "ObjectTypeRoomChat";
export const ObjectTypeMessage: string = "ObjectTypeMessage";
export const ObjectTypePost: string = "ObjectTypePost";
export const FileTypeImage: string = "FileTypeImage";
export const NotificationTypeLike: string = "TypeLike";
export const NotificationTypeComment: string = "TypeComment";
export const NotificationTypeRequestFriendShip: string =
  "TypeRequestFriendShip";
export const NotificationTypeAcceptFriendShip: string = "TypeAcceptFriendShip";
