import {
  CreateCommentRequestBody,
  UpdateCommentRequestBody,
} from "@/types/DataObject";
import axios, { AxiosRequestConfig } from "axios";

const createComment = (data: CreateCommentRequestBody, token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/comment`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const updateComment = (
  id: number,
  data: UpdateCommentRequestBody,
  token: string
) => {
  const option: AxiosRequestConfig = {
    method: "PUT",
    url: `${process.env.NEXT_PUBLIC_API_URI}/comment/${id}`,
    headers: {
      Authorization: token,
    },
    data,
  };
  return axios.request(option);
};
const deleteComment = (id: number, token: string) => {
  const option: AxiosRequestConfig = {
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_API_URI}/comment/${id}`,
    headers: {
      Authorization: token,
    },
  };
  return axios.request(option);
};
const CommentAPI = { createComment, updateComment, deleteComment };
export default CommentAPI;
