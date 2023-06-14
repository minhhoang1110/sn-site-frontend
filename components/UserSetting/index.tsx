import { User } from "@/types/DataObject";
import React, { useState } from "react";
import Avatar from "../Avatar";
import Tooltip from "../Tooltip";
import Icon from "@/icons";
import TextField from "../TextField";
import Button from "../Button";
import moment from "moment";
import { DateTimeFormat } from "@/configs/constants";
import { useAuthentication } from "@/hooks";
import { AuthenticationAPI, UserAPI } from "@/api";
import Modal from "../Modal";
import { useRouter } from "next/router";
interface Props {
  user: User | null;
  loadProfile: any;
}
const UserSetting: React.FC<Props> = ({ user, loadProfile }) => {
  const router = useRouter();
  const { session } = useAuthentication();
  const [openUpdateForm, setOpenUpdateForm] = useState<boolean>(false);
  const [openSuccesModal, setOpenSuccesModal] = useState<boolean>(false);
  const initValue = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  };
  const [values, setValues] = useState(initValue);
  const handleOnCloseForm = () => {
    setOpenUpdateForm(false);
    setValues(initValue);
  };
  const handleUpdateName = (e: any) => {
    e.preventDefault();
    if (!session || !session.accessToken || !user) return;
    const updatedUser: User = Object.assign({}, { ...user }, { ...values });
    UserAPI.updateProfile(updatedUser.id || 0, updatedUser, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          const result: User = res.data.data;
          setOpenSuccesModal(true);
          setTimeout(() => {
            setOpenSuccesModal(false);
            setOpenUpdateForm(false);
            loadProfile();
            setValues({
              firstName: result?.firstName || "",
              lastName: result?.lastName || "",
            });
          }, 2000);
        }
      })
      .catch((error) => {});
  };
  const handleSendVerifyEmail = () => {
    if (!session || !session.accessToken || !user) return;
    AuthenticationAPI.sendVerifyEmail(session.accessToken)
      .then((res) => {
        if (res.data.success) {
          router.reload();
        }
      })
      .catch((error) => {});
  };
  return (
    <div className="w-full bg-white p-3 rounded-md shadow-md my-3 flex items-center">
      <Avatar
        url={user?.avatarUrl || ""}
        placeholder={
          (user &&
            `${user.firstName.substring(0, 1)} ${user.lastName.substring(
              0,
              1
            )}`) ||
          ""
        }
        size="xl"
      />
      <div>
        {!openUpdateForm && (
          <div className="ml-3 flex items-center">
            <span className="font-bold text-4xl mr-2">
              {(user && `${user.firstName} ${user.lastName}`) || ""}
            </span>
            <div
              className="cursor-pointer"
              onClick={() => setOpenUpdateForm(true)}
            >
              <Tooltip placement="bottom" text="Đổi tên">
                <Icon icon="pencil-square" />
              </Tooltip>
            </div>
          </div>
        )}
        {openUpdateForm && (
          <div className="ml-3">
            <form onSubmit={handleUpdateName}>
              <div className="mb-2">
                <TextField
                  fontSize="text-base"
                  hasBorder={true}
                  id="firstName"
                  placeholder="Tên"
                  readOnly={false}
                  required={true}
                  type="text"
                  width="w-full"
                  values={values}
                  setValues={setValues}
                />
              </div>
              <div className="mb-2">
                <TextField
                  fontSize="text-base"
                  hasBorder={true}
                  id="lastName"
                  placeholder="Họ"
                  readOnly={false}
                  required={true}
                  type="text"
                  width="w-full"
                  values={values}
                  setValues={setValues}
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="mr-3">
                  <Button
                    fontSize="text-base"
                    lineHeight="leading-9"
                    text="Huỷ"
                    textColor="black"
                    type="button"
                    width="auto"
                    background="bg-gray-300"
                    eventFuntion={handleOnCloseForm}
                  />
                </div>
                <Button
                  fontSize="text-base"
                  lineHeight="leading-9"
                  text="Chỉnh sửa"
                  textColor="white"
                  type="submit"
                  width="auto"
                  background="bg-sky-600"
                  boldText={true}
                />
              </div>
            </form>
          </div>
        )}
        <div className="mt-2 ml-3">
          {!(user && user.sendVerifyEmailAt) && (
            <Button
              fontSize="text-base"
              lineHeight="leading-9"
              text="Xác thực email"
              textColor="white"
              type="button"
              width="auto"
              background="bg-sky-600"
              boldText={true}
              eventFuntion={handleSendVerifyEmail}
            />
          )}
          {user && user.sendVerifyEmailAt && !user.verifyEmailAt && (
            <div className="text-green-600 font-bold whitespace-pre-line">{`Bạn đã gửi yêu cầu xác thực email vào lúc ${moment(
              new Date(user.sendVerifyEmailAt)
            ).format(
              DateTimeFormat
            )}.\nEmail có hiệu lực trong vòng 24h. Vui lòng kiểm tra hộp thư của bạn.`}</div>
          )}
          {user && user.verifyEmailAt && (
            <div className="text-green-600 font-bold whitespace-pre-line">{`Email của bạn đã được xác thực.`}</div>
          )}
        </div>
      </div>
      <Modal
        content="Đổi tên thành công"
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
export default UserSetting;
