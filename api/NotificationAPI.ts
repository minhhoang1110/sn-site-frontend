import axios, { AxiosRequestConfig } from "axios";

const getListNotification = (token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/notification`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const readNotification = (id: number, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/notification/${id}`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const readAllNotification = (token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/notification/read_all`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const NotificationAPI = {
  getListNotification,
  readAllNotification,
  readNotification,
};
export default NotificationAPI;
