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
const ChatAPI = { getListRoomChat, getRoomChatDetail, getListMessage };
export default ChatAPI;
