import { AuthenticationAPI } from "@/api";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import { ForgotPasswordRequestBody } from "@/types/DataObject";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { token, email, temporary_password } = router.query;
  const initValue: ForgotPasswordRequestBody = {
    email: "",
    temporaryPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    token: "",
  };
  const [values, setValues] = useState<ForgotPasswordRequestBody>(initValue);
  const [openSuccesModal, setOpenSuccesModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleRequestForgotPassword = (e: any) => {
    e.preventDefault();
    if (!token || !email || !temporary_password) return;
    if (values.newPassword !== values.confirmNewPassword) {
      setError("Vui lòng nhập lại chính xác mật khẩu mới");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    const data: ForgotPasswordRequestBody = Object.assign(
      {},
      { ...values },
      {
        email: email.toString(),
        token: token.toString(),
        temporaryPassword: temporary_password.toString(),
      }
    );
    AuthenticationAPI.forgotPassword(data)
      .then((res) => {
        if (res.data.success) {
          setOpenSuccesModal(true);
          setTimeout(() => {
            setOpenSuccesModal(false);
            router.push("/login");
          }, 1000);
          return;
        }
        setError("Có lỗi xảy ra !!!!");
        setTimeout(() => {
          setError("");
        }, 3000);
      })
      .catch((error) => {
        setError("Có lỗi xảy ra !!!!");
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen bg-slate-200">
      <h1 className="text-center text-sky-600 mb-5 font-bold text-6xl">
        SN Site
      </h1>
      <div className="w-full max-w-md py-5 px-3.5 rounded-lg shadow bg-white mx-4">
        <form onSubmit={handleRequestForgotPassword}>
          <div className="mb-2">
            <TextField
              fontSize="text-base"
              hasBorder={true}
              id="newPassword"
              placeholder="Mật khẩu mới"
              label="Mật khẩu mới"
              readOnly={false}
              required={true}
              type="password"
              width="w-full"
              values={values}
              setValues={setValues}
            />
          </div>
          <div className="mb-2">
            <TextField
              fontSize="text-base"
              hasBorder={true}
              id="confirmNewPassword"
              placeholder="Nhập lại mật khẩu mới"
              label="Nhập lại mật khẩu mới"
              readOnly={false}
              required={true}
              type="password"
              width="w-full"
              values={values}
              setValues={setValues}
            />
          </div>
          {error && <div className="text-rose-700">{error}</div>}
          <div className="py-1.5">
            <Button
              fontSize="text-xl"
              text="Đổi mật khẩu"
              type="submit"
              width="full"
              background="bg-sky-600"
              boldText
              lineHeight={"leading-10"}
              textColor="white"
            />
          </div>
        </form>
      </div>
      <Modal
        content="Đổi mật khẩu thành công"
        fontSize="lg"
        hasFooter={false}
        open={openSuccesModal}
        setOpen={setOpenSuccesModal}
        textAlign="center"
        boldText={true}
      />
    </div>
  );
};
export default ResetPassword;
