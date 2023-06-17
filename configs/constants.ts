import { SelectOption, TabData } from "@/types/common";

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
  {
    text: "Ảnh",
    paramValue: "image",
  },
];
export const DateFormat: string = "DD/MM/YYYY";
export const DateTimeFormat: string = "HH:mm, DD/MM/YYYY";
export const FriendshipStateRequested: string = "StateRequested";
export const FriendshipStateFriend: string = "StateFriend";
export const RoomChatTypeDefault: string = "RoomTypeDefault";
export const RoomChatTypeGroup: string = "RoomTypeGroup";
