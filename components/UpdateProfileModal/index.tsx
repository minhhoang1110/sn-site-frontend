import { UpdateProfileBody, User } from "@/types/DataObject";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import Button from "../Button";
import TextField from "../TextField";
import SingleDatePicker from "../SingleDatePicker";
import { UserAPI } from "@/api";
import { useAuthentication } from "@/hooks";
import Modal from "../Modal";
import { useRouter } from "next/router";
import Icon from "@/icons";
import ImageField from "../ImageField";
import { ObjectTypeUserAvatar, ObjectTypeUserCover } from "@/configs/constants";
interface Props {
  user: User | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UpdateProfileModal: React.FC<Props> = ({ user, open, setOpen }) => {
  const router = useRouter();
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { session } = useAuthentication();
  const initValue: UpdateProfileBody = {
    address: user?.address || "",
    avatarUrl: user?.avatarUrl || "",
    bio: user?.bio || "",
    coverUrl: user?.coverUrl || "",
    dateOfBirth: new Date(user?.dateOfBirth || ""),
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
  };
  const [values, setValues] = useState<UpdateProfileBody>(initValue);
  const cancelButtonRef = useRef(null);
  const handleUpdateProfile = (e: any) => {
    e.preventDefault();
    const updatedUser: User = Object.assign(user as User, values);
    UserAPI.updateProfile(
      updatedUser.id,
      updatedUser,
      session?.accessToken || ""
    )
      .then((res) => {
        if (res.data.success) {
          setOpenSuccessModal(true);
          setTimeout(() => {
            setOpenSuccessModal(false);
            setOpen(false);
          }, 2000);
          router.reload();
          return;
        }
        setOpenSuccessModal(false);
        setError("Có gì đó sai sai !!!!");
        setTimeout(() => setError(""), 3000);
      })
      .catch((error) => {
        setOpenSuccessModal(false);
        setError("Có gì đó sai sai !!!!");
        setTimeout(() => setError(""), 3000);
      });
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                <form onSubmit={handleUpdateProfile}>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div>
                      <div className="text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-xl text-center font-bold leading-6 text-gray-900 border-b border-gray-300 border-solid pb-5 relative"
                        >
                          <div
                            className="flex items-center justify-center text-center w-10 h-10 mr-4 cursor-pointer absolute top-0 left-0"
                            onClick={() => setOpen(false)}
                          >
                            <Icon icon="arrow-left" />
                          </div>
                          Chỉnh sửa trang cá nhân
                        </Dialog.Title>

                        <div className="mt-2 text-left">
                          <div className="mb-2">
                            <ImageField
                              inputType="text-field"
                              readOnly={false}
                              fontSize="text-base"
                              id="avatarUrl"
                              required={false}
                              width="w-full"
                              label="Ảnh đại diện"
                              values={values}
                              setValues={setValues}
                              objectType={ObjectTypeUserAvatar}
                            />
                          </div>
                          <div className="mb-2">
                            <ImageField
                              inputType="text-field"
                              readOnly={false}
                              fontSize="text-base"
                              id="coverUrl"
                              required={false}
                              width="w-full"
                              label="Ảnh bìa"
                              values={values}
                              setValues={setValues}
                              objectType={ObjectTypeUserCover}
                            />
                          </div>
                          <div className="mb-2">
                            <TextField
                              readOnly={false}
                              fontSize="text-base"
                              hasBorder={true}
                              id="bio"
                              placeholder="Tiểu sử"
                              required={false}
                              type="text"
                              width="w-full"
                              label="Tiểu sử"
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          <div className="mb-2">
                            <TextField
                              readOnly={false}
                              fontSize="text-base"
                              hasBorder={true}
                              id="address"
                              placeholder="Địa chỉ"
                              required={true}
                              type="text"
                              width="w-full"
                              label="Địa chỉ"
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          <div className="mb-2">
                            <TextField
                              readOnly={false}
                              fontSize="text-base"
                              hasBorder={true}
                              id="firstName"
                              placeholder="Tên"
                              required={true}
                              type="text"
                              width="w-full"
                              label="Tên"
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          <div className="mb-2">
                            <TextField
                              readOnly={false}
                              fontSize="text-base"
                              hasBorder={true}
                              id="lastName"
                              placeholder="Họ"
                              required={true}
                              type="text"
                              width="w-full"
                              label="Họ"
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          <div className="mb-2">
                            <SingleDatePicker
                              fontSize="text-base"
                              id="dateOfBirth"
                              required={true}
                              width="w-full"
                              label="Ngày tháng năm sinh"
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          <div className="mb-2">
                            <TextField
                              readOnly={false}
                              fontSize="text-base"
                              hasBorder={true}
                              id="phone"
                              placeholder="Số điện thoại"
                              required={true}
                              type="tel"
                              width="w-full"
                              label="Số điện thoại"
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {error && <div className="text-rose-700">{error}</div>}
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      background="bg-sky-600"
                      fontSize="text-base"
                      text="Cập nhật"
                      type="submit"
                      width="full"
                      textColor="white"
                      lineHeight="leading-9"
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <Modal
            content="Cập nhật thành công"
            hasFooter={false}
            open={openSuccessModal}
            setOpen={setOpenSuccessModal}
            textAlign="center"
            fontSize="xl"
            boldText
          />
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default UpdateProfileModal;
