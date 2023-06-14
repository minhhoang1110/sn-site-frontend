import { AuthenticationAPI } from "@/api";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import { ReqForgotPasswordRequest } from "@/types/DataObject";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const initValue: ReqForgotPasswordRequest = {
    email: "",
  };
  const [values, setValues] = useState<ReqForgotPasswordRequest>(initValue);
  const [openSuccesModal, setOpenSuccesModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const handleRequestForgotPassword = (e: any) => {
    e.preventDefault();
    AuthenticationAPI.requestForgotPassword(values)
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
          <TextField
            fontSize="text-lg"
            hasBorder={true}
            id="email"
            placeholder="Email"
            required={true}
            type="email"
            width="w-full"
            readOnly={false}
            values={values}
            setValues={setValues}
          />
          {error && <div className="text-rose-700">{error}</div>}
          <div className="py-1.5">
            <Button
              fontSize="text-xl"
              text="Gửi yêu cầu"
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
          <Link href="/login">Quay lại</Link>
        </div>
      </div>
      <Modal
        content="Gửi yêu cầu thành công"
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
export default ForgotPassword;
