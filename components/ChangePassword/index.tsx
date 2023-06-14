import { ChangePasswordRequestBody } from "@/types/DataObject";
import React, { useState } from "react";
import TextField from "../TextField";
import Button from "../Button";
import { useAuthentication } from "@/hooks";
import { AuthenticationAPI } from "@/api";
import Modal from "../Modal";
import { useRouter } from "next/router";
const ChangePassword: React.FC = () => {
  const router = useRouter();
  const { session } = useAuthentication();
  const initValue: ChangePasswordRequestBody = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const [values, setValues] = useState<ChangePasswordRequestBody>(initValue);
  const [error, setError] = useState<string>("");
  const [openSuccesModal, setOpenSuccesModal] = useState<boolean>(false);
  const handleChangePassword = (e: any) => {
    e.preventDefault();
    if (values.newPassword !== values.confirmNewPassword) {
      setError("Vui lòng nhập lại chính xác mật khẩu mới");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (!session || !session.accessToken) return;
    AuthenticationAPI.changePassword(values, session.accessToken)
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
    <div className="w-full bg-white p-3 rounded-md shadow-md my-3">
      <h3 className="text-xl font-bold mb-2">Đổi mật khẩu</h3>
      <form onSubmit={handleChangePassword}>
        <div className="mb-2">
          <TextField
            fontSize="text-base"
            hasBorder={true}
            id="oldPassword"
            placeholder="Mật khẩu cũ"
            label="Mật khẩu cũ"
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
        <div className="flex items-center justify-center">
          <Button
            fontSize="text-base"
            lineHeight="leading-9"
            text="Đổi mật khẩu"
            textColor="white"
            type="submit"
            width="auto"
            background="bg-sky-600"
            boldText={true}
          />
        </div>
      </form>
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
export default ChangePassword;
