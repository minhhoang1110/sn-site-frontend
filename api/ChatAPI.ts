import {
  CreateMessageRequestBody,
  CreateRoomChatRequestBody,
} from "@/types/DataObject";
import axios, { AxiosRequestConfig } from "axios";

const getListRoomChat = (token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/roomchat`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const getRoomChatDetail = (id: string, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/roomchat/${id}`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const getListMessage = (roomId: number, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/message`,
    headers: {
      Authorization: token,
    },
    params: {
      roomId,
    },
  };
  return axios.request(option);
};
const createMessage = (data: CreateMessageRequestBody, token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/message`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const deleteMessage = (id: number, token: string) => {
  const option: AxiosRequestConfig = {
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_API_URI}/message/${id}`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const createRoomChat = (data: CreateRoomChatRequestBody, token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/roomchat`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const ChatAPI = {
  getListRoomChat,
  getRoomChatDetail,
  getListMessage,
  createMessage,
  deleteMessage,
  createRoomChat,
};
export default ChatAPI;
