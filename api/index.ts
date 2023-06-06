import axios from "axios";
import AuthenticationAPI from "./AuthenticationAPI";
import UserAPI from "./UserAPI";
import PostAPI from "./PostAPI";
import { onResponseError, onResponseSuccess } from "@/configs/axiosInterceptor";
axios.interceptors.response.use(onResponseSuccess, onResponseError);
export { AuthenticationAPI, UserAPI, PostAPI };
