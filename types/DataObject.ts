interface BaseData {
  id: number;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
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
  isActive: boolean;
  lastName: string;
  password: string;
  phone: string;
  sendVerifyEmailAt: string;
  username: string;
  verifyEmailAt: string;
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
}
export interface ListPostParams {
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
