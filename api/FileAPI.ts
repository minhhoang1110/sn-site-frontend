import { ListFileParams } from "@/types/DataObject";
import axios, { AxiosRequestConfig } from "axios";

const uploadFile = (data: FormData, token: string) => {
  const option: AxiosRequestConfig = {
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URI}/file`,
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
    data,
  };
  return axios.request(option);
};
const listFile = (params: ListFileParams, token: string) => {
  const option: AxiosRequestConfig = {
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_API_URI}/file`,
    headers: {
      Authorization: token,
    },
    params,
  };
  return axios.request(option);
};
const FileAPI = { uploadFile, listFile };
export default FileAPI;
