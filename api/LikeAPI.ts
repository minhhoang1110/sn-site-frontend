import { CreateLikeRequestBody } from "@/types/DataObject";
import axios, { AxiosRequestConfig } from "axios";

const createLike = (data: CreateLikeRequestBody, token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/like`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const deleteLike = (id: number, token: string) => {
  const option: AxiosRequestConfig = {
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_API_URI}/like/${id}`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const LikeAPI = { createLike, deleteLike };
export default LikeAPI;
