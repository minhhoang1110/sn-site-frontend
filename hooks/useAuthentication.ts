/* eslint-disable react-hooks/exhaustive-deps */
import { authenticationAction } from "@/actions";
import { UserWithToken } from "@/types/DataObject";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuthentication = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [session, setSession] = useState<UserWithToken | null>(null);
  const userValue: UserWithToken = useSelector(
    (state: any) => state.AuthenticationReducer
  );
  const loadSesssion = () => {
    const sessionJSON: string | null = localStorage.getItem("session");
    if (
      !sessionJSON &&
      (!userValue.user || !userValue.accessToken || !userValue.refreshToken)
    ) {
      router.push("/login");
      return;
    }
    if (
      userValue &&
      userValue.user &&
      userValue.accessToken &&
      userValue.refreshToken
    ) {
      localStorage.setItem("session", JSON.stringify(userValue));
      setSession(userValue);
      return;
    }
    const localSession: UserWithToken = JSON.parse(
      sessionJSON || ""
    ) as UserWithToken;
    dispatch(authenticationAction.setSessionToStore(localSession));
    setSession(localSession);
  };
  useEffect(() => {
    loadSesssion();
  }, [session]);
  return { session, setSession, loadSesssion };
};
export default useAuthentication;
