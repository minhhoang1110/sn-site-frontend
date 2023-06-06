import { CreatePostRequestBody, ListPostParams } from "@/types/DataObject";
import axios, { AxiosRequestConfig } from "axios";

const createPost = (data: CreatePostRequestBody, token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/post`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const updatePost = (id: number, data: CreatePostRequestBody, token: string) => {
  const option: AxiosRequestConfig = {
    method: "PUT",
    url: `${process.env.NEXT_PUBLIC_API_URI}/post/${id}`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const getListPost = (params: ListPostParams, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/post`,
    headers: {
      Authorization: token,
    },
    params,
  };
  return axios.request(option);
};
const PostAPI = { createPost, getListPost, updatePost };
export default PostAPI;
