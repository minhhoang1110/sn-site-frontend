import { authenticationAction } from "@/actions";
import { AuthenticationAPI } from "@/api";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Signup from "@/components/Signup";
import TextField from "@/components/TextField";
import { LoginRequestBody, UserWithToken } from "@/types/DataObject";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const initValue: LoginRequestBody = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState<LoginRequestBody>(initValue);
  const [loginError, setLoginError] = useState<String>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  const handleOnSubmitLogin = (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    AuthenticationAPI.login(values.username, values.password)
      .then((res) => {
        if (res.data.success) {
          dispatch(
            authenticationAction.setSessionToStore(
              res.data.data as UserWithToken
            )
          );
          setIsSubmit(false);
          router.push("/");
          return;
        }
        setIsSubmit(false);
        setLoginError("Tài khoản hoặc mật khẩu sai !!!!");
        setTimeout(() => setLoginError(""), 3000);
      })
      .catch((error) => {
        setIsSubmit(false);
        setLoginError("Tài khoản hoặc mật khẩu sai !!!!");
        setTimeout(() => setLoginError(""), 3000);
      });
  };
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen bg-slate-200">
      <h1 className="text-center text-sky-600 mb-5 font-bold text-6xl">
        SN Site
      </h1>
      <div className="w-full max-w-md py-5 px-3.5 rounded-lg shadow bg-white mx-4">
        <div className="border-b border-gray-300 border-solid pb-5 mb-5">
          <form onSubmit={handleOnSubmitLogin}>
            <TextField
              fontSize="text-lg"
              hasBorder={true}
              id="username"
              placeholder="Nhập tên đăng nhập"
              required={true}
              type="text"
              width="w-full"
              readOnly={false}
              values={values}
              setValues={setValues}
            />
            <TextField
              fontSize="text-lg"
              hasBorder={true}
              id="password"
              placeholder="Nhập mật khẩu"
              required={true}
              type="password"
              width="w-full"
              readOnly={false}
              values={values}
              setValues={setValues}
            />
            {loginError && <div className="text-rose-700">{loginError}</div>}
            <div className="py-1.5">
              <Button
                fontSize="text-xl"
                text="Đăng nhập"
                type="submit"
                width="full"
                background="bg-sky-600"
                boldText
                lineHeight={"leading-10"}
                textColor="white"
              />
            </div>
          </form>
          <div className="mt-4 w-full text-center text-sky-600">
            <Link href="/forgot-password">Quên mật khẩu?</Link>
          </div>
        </div>
        <div className="pt-1.5 w-full flex items-center justify-center">
          <Button
            fontSize="text-xl"
            text="Tạo tài khoản"
            type="button"
            width="3/5"
            background="bg-green-600"
            boldText
            lineHeight={"leading-10"}
            textColor="white"
            eventFuntion={() => setOpenSignup(true)}
          />
        </div>
      </div>
      <Modal
        content="Đang đăng nhập"
        hasFooter={false}
        open={isSubmit}
        setOpen={setIsSubmit}
        textAlign="center"
        fontSize="xl"
        boldText
      />
      <Signup open={openSignup} setOpen={setOpenSignup} />
    </div>
  );
};
export default Login;
