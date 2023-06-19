import { CreateFriendshipBody, ListFriendShipParam } from "@/types/DataObject";
import axios, { AxiosRequestConfig } from "axios";

const getFriendshipDetail = (userId: string, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/friendship/${userId}`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const getListFriendship = (params: ListFriendShipParam, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/friendship`,
    headers: {
      Authorization: token,
    },
    params,
  };
  return axios.request(option);
};
const getListRequestedFriendship = (token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/friendship/requested`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const createFriendship = (data: CreateFriendshipBody, token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/friendship`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const updateFriendship = (
  id: number,
  data: CreateFriendshipBody,
  token: string
) => {
  const option: AxiosRequestConfig = {
    method: "PUT",
    url: `${process.env.NEXT_PUBLIC_API_URI}/friendship/${id}`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const deleteFriendship = (id: number, token: string) => {
  const option: AxiosRequestConfig = {
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_API_URI}/friendship/${id}`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const FriendshipAPI = {
  getFriendshipDetail,
  createFriendship,
  updateFriendship,
  deleteFriendship,
  getListFriendship,
  getListRequestedFriendship,
};
export default FriendshipAPI;
