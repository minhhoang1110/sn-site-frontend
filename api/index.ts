import axios from "axios";
import AuthenticationAPI from "./AuthenticationAPI";
import UserAPI from "./UserAPI";
import PostAPI from "./PostAPI";
import FriendshipAPI from "./FriendshipAPI";
import LikeAPI from "./LikeAPI";
import CommentAPI from "./CommentAPI";
import ChatAPI from "./ChatAPI";
import FileAPI from "./FileAPI";
import { onResponseError, onResponseSuccess } from "@/configs/axiosInterceptor";
axios.interceptors.response.use(onResponseSuccess, onResponseError);
export {
  AuthenticationAPI,
  UserAPI,
  PostAPI,
  FriendshipAPI,
  LikeAPI,
  CommentAPI,
  ChatAPI,
  FileAPI,
};
