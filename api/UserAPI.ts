import { User } from "@/types/DataObject";
import { SearchObj } from "@/types/common";
import axios, { AxiosRequestConfig } from "axios";
const currentProfile = (token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/current_profile`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const updateProfile = (id: number, data: User, token: string) => {
  const option: AxiosRequestConfig = {
    method: "PUT",
    url: `${process.env.NEXT_PUBLIC_API_URI}/user/${id}`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const getListUser = (params: SearchObj, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/user`,
    headers: {
      Authorization: token,
    },
    params,
  };
  return axios.request(option);
};
const getUserDetail = (id: string, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/user/${id}`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const UserAPI = { currentProfile, updateProfile, getListUser, getUserDetail };
export default UserAPI;
