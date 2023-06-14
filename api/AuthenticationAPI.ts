import {
  ChangePasswordRequestBody,
  ForgotPasswordRequestBody,
  RefreshTokenRequestBody,
  ReqForgotPasswordRequest,
  SignupRequestBody,
} from "@/types/DataObject";
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
const sendVerifyEmail = (token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/send_verify_email`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const verifyEmail = (token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/verify_email`,
    params: {
      token,
    },
  };
  return axios.request(option);
};
const changePassword = (data: ChangePasswordRequestBody, token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/change_password`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const requestForgotPassword = (data: ReqForgotPasswordRequest) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/request_forgot_password`,
    data,
  };
  return axios.request(option);
};
const forgotPassword = (data: ForgotPasswordRequestBody) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/forgot_password`,
    data,
  };
  return axios.request(option);
};
const AuthenticationAPI = {
  login,
  signup,
  refreshToken,
  sendVerifyEmail,
  verifyEmail,
  changePassword,
  requestForgotPassword,
  forgotPassword,
};
export default AuthenticationAPI;
