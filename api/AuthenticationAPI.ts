import { RefreshTokenRequestBody, SignupRequestBody } from "@/types/DataObject";
import axios, { AxiosRequestConfig } from "axios";
const login = (username: string, password: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/login`,
    data: {
      username,
      password,
    },
  };
  return axios.request(option);
};
const signup = (data: SignupRequestBody) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/signup`,
    data,
  };
  return axios.request(option);
};
const refreshToken = (data: RefreshTokenRequestBody) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/refresh_token`,
    data,
  };
  return axios.request(option);
};
const AuthenticationAPI = { login, signup, refreshToken };
export default AuthenticationAPI;
