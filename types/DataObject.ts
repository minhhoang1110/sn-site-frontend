interface BaseData {
  id: number;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
interface PaginationParam {
  limit: number;
  offset: number;
  page: number;
}
export interface User extends BaseData {
  address: string;
  avatarUrl: string;
  bio: string | null;
  countOfFriends: number;
  coverUrl: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  sendVerifyEmailAt: string;
  username: string;
  verifyEmailAt: string;
  chatWithSessionUser: boolean;
  roomChatId: number;
  beFriendWidthSessionUser: boolean;
}
export interface UserWithToken {
  accessToken: string;
  refreshToken: string;
  user: User | null;
}

export interface SignupRequestBody {
  dateOfBirth: Date | null;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  username: string;
}
export interface LoginRequestBody {
  username: string;
  password: string;
}
export interface UpdateProfileBody {
  address: string;
  avatarUrl: string;
  bio: string | null;
  coverUrl: string;
  dateOfBirth: Date | null;
  firstName: string;
  lastName: string;
  phone: string;
}
export interface CreatePostRequestBody {
  userId: number;
  sharedType: string;
  content: string;
  imageUrls: string;
}
export interface Post extends BaseData {
  userId: number;
  user: User;
  sharedType: string;
  content: string;
  imageUrls: string;
  countOfLikes: number;
  countOfComments: number;
  likes: LikeObj[];
  comments: Comment[];
}
export interface ListPostParams extends PaginationParam {
  userId: number | "";
}
export interface RefreshTokenRequestBody {
  refreshToken: string;
}
export interface Friendship extends BaseData {
  firstUserId: number;
  firstUser: User;
  secondUserId: number;
  secondUser: User;
  state: String;
}
export interface CreateFriendshipBody {
  firstUserId: number;
  secondUserId: number;
  state: string;
}
export interface CreateLikeRequestBody {
  userId: number;
  postId: number;
}
export interface LikeObj extends BaseData {
  userId: number;
  user: User;
  postId: number;
}
export interface Comment extends BaseData {
  userId: number;
  user: User;
  postId: number;
  comment: string;
}
export interface CreateCommentRequestBody {
  userId: number;
  postId: number;
  comment: string;
}
export interface UpdateCommentRequestBody {
  comment: string;
}
export interface ChangePasswordRequestBody {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface ReqForgotPasswordRequest {
  email: string;
}
export interface ForgotPasswordRequestBody {
  email: string;
  temporaryPassword: string;
  newPassword: string;
  token: string;
  confirmNewPassword: string;
}
export interface RoomChat extends BaseData {
  userIds: string;
  roomType: string;
  thumbnailUrl: string;
  hasUnreadMessage: boolean;
}
export interface Message extends BaseData {
  roomId: number;
  room: RoomChat;
  userId: number;
  user: User;
  isRead: boolean;
  message: string;
  imageUrl: string;
}
export interface CreateMessageRequestBody {
  roomId: number;
  userId: number;
  message: string;
  imageUrl: string;
}
export interface CreateRoomChatRequestBody {
  userIds: string;
  roomType: string;
  thumbnailUrl: string;
}
export interface ListFriendShipParam {
  userId: number | null;
}
export interface UploadFileRequestBody {
  file: File;
  fileType: string;
  objectType: string;
  userId: number;
}
export interface FileData extends BaseData {
  fileType: string;
  objectType: string;
  userId: number;
  url: string;
}
export interface ListFileParams {
  userId: number;
}
export interface Notification extends BaseData {
  userId: number;
  user: User;
  fromUserId: number;
  fromUser: User;
  type: string;
  objectId: number;
  action: string;
  read: boolean;
}
