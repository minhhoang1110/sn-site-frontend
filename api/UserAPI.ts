import { User } from "@/types/DataObject";
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
const UserAPI = { currentProfile, updateProfile };
export default UserAPI;
