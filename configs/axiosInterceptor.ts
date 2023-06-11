import { authenticationAction } from "@/actions";
import { AuthenticationAPI } from "@/api";
import { UserWithToken } from "@/types/DataObject";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";

export const onResponseSuccess = (response: AxiosResponse) => {
  return response;
};
const logout = () => {
  window.location.pathname = "/login";
  return;
};
const RefreshToken = (error: any) => {
  const dispatch = useDispatch();
  let refreshToken: string = "";
  const sessionJSON: string | null = localStorage.getItem("session");
  if (!sessionJSON) {
    logout();
    return;
  }
  const localSession: UserWithToken = JSON.parse(
    sessionJSON || ""
  ) as UserWithToken;
  refreshToken = localSession.refreshToken;
  if (!refreshToken) {
    logout();
    return;
  }
  AuthenticationAPI.refreshToken({ refreshToken })
    .then((res) => {
      if (res.data.success) {
        dispatch(
          authenticationAction.setSessionToStore(res.data.data as UserWithToken)
        );
        // error.config.headers = {
        //   Authorization: res.data.data.accessToken as string,
        // };
        // return axios(error.config);
      }
      logout();
      return;
    })
    .catch((error) => {
      logout();
      return;
    });
};
export const onResponseError = (error: AxiosError) => {
  if (error.response?.status !== 401) {
    const errMessage = error.response?.data || error?.response || error;
    return Promise.reject(errMessage);
  }
  // return RefreshToken(error);
  return logout();
};
