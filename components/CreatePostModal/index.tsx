import { CreatePostRequestBody, Post, User } from "@/types/DataObject";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import Avatar from "../commons/Avatar";
import Button from "../commons/Button";
import TextAreaField from "../commons/TextAreaField";
import SelectField from "../commons/SelectField";
import { ObjectTypePost, POST_SHARED_TYPE_OPTION } from "@/configs/constants";
import { PostAPI } from "@/api";
import { useAuthentication } from "@/hooks";
import Modal from "../commons/Modal";
import { useRouter } from "next/router";
import { getAvatarPlaceholder } from "@/helper/componentData";
import ImageField from "../commons/ImageField";
import Icon from "@/icons";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  post?: Post;
}
const CreatePostModal: React.FC<Props> = ({
  open,
  setOpen,
  user,
  post = null,
}) => {
  const router = useRouter();
  const initValue: CreatePostRequestBody = {
    userId: (post && post.userId) || user?.id || -1,
    content: (post && post.content) || "",
    sharedType: (post && post.sharedType) || "SharedTypePublic",
    imageUrls: (post && post.imageUrls) || "",
  };
  const [values, setValues] = useState<CreatePostRequestBody>(initValue);
  const [error, setError] = useState<string>("");
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const { session } = useAuthentication();
  const cancelButtonRef = useRef(null);
  const handleOnCreatePost = (e: any) => {
    e.preventDefault();
    if (post) {
      PostAPI.updatePost(post.id, values, session?.accessToken || "")
        .then((res) => {
          if (res.data.success) {
            setOpenSuccessModal(true);
            setTimeout(() => {
              setOpenSuccessModal(false);
              setOpen(false);
            }, 2000);
            setValues(initValue);
            router.reload();
            return;
          }
          setOpenSuccessModal(false);
          setError("Có gì đó sai sai !!!!");
          setTimeout(() => setError(""), 3000);
          setValues(initValue);
        })
        .catch((error) => {
          setOpenSuccessModal(false);
          setError("Có gì đó sai sai !!!!");
          setTimeout(() => setError(""), 3000);
          setValues(initValue);
        });
      return;
    }
    PostAPI.createPost(values, session?.accessToken || "")
      .then((res) => {
        if (res.data.success) {
          setOpenSuccessModal(true);
          setTimeout(() => {
            setOpenSuccessModal(false);
            setOpen(false);
          }, 2000);
          setValues(initValue);
          router.reload();
          return;
        }
        setOpenSuccessModal(false);
        setError("Có gì đó sai sai !!!!");
        setTimeout(() => setError(""), 3000);
        setValues(initValue);
      })
      .catch((error) => {
        setOpenSuccessModal(false);
        setError("Có gì đó sai sai !!!!");
        setTimeout(() => setError(""), 3000);
        setValues(initValue);
      });
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-100"
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
                <form onSubmit={handleOnCreatePost}>
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div>
                      <div className="text-center">
                        <Dialog.Title
                          as="h3"
                          className="text-xl text-center font-bold leading-6 text-gray-900 border-b border-gray-300 border-solid pb-3 relative"
                        >
                          <div
                            className="flex items-center justify-center text-center w-10 h-10 mr-4 cursor-pointer absolute top-0 left-0"
                            onClick={() => setOpen(false)}
                          >
                            <Icon icon="arrow-left" />
                          </div>
                          Tạo bài viết
                        </Dialog.Title>

                        <div className="mt-2">
                          <div className="flex items-center">
                            <Avatar
                              url={user?.avatarUrl || ""}
                              size="md"
                              placeholder={getAvatarPlaceholder(user)}
                            />
                            <div className="ml-2 text-left">
                              <div className="font-bold">
                                {(user &&
                                  `${user.firstName} ${user.lastName}`) ||
                                  ""}
                              </div>
                              <div className="scale-75 origin-left">
                                <SelectField
                                  options={POST_SHARED_TYPE_OPTION}
                                  defaultOption={
                                    POST_SHARED_TYPE_OPTION.find(
                                      (p) => p.key === initValue.sharedType
                                    ) || POST_SHARED_TYPE_OPTION[0]
                                  }
                                  id="sharedType"
                                  values={values}
                                  setValues={setValues}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <TextAreaField
                              hasOutline={false}
                              fontSize="text-xl"
                              hasBorder={false}
                              id="content"
                              placeholder={`${
                                user &&
                                user.firstName &&
                                `${user.firstName} ơi, `
                              }bạn đang nghĩ gì thế?`}
                              required={false}
                              width="w-full"
                              readOnly={false}
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          {values && values.imageUrls && (
                            <div
                              className="rounded-md flex items-center justify-center min-h-240px w-full border border-gray-300 border-solid bg-white bg-contain bg-center bg-no-repeat my-3"
                              style={{
                                backgroundImage: `url('${
                                  values && values.imageUrls
                                }')`,
                              }}
                            ></div>
                          )}
                          <div className="mt-2">
                            <ImageField
                              inputType="icon"
                              readOnly={false}
                              fontSize="text-base"
                              id="imageUrls"
                              required={false}
                              width="w-full"
                              label=""
                              values={values}
                              setValues={setValues}
                              objectType={ObjectTypePost}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {error && <div className="text-rose-700">{error}</div>}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button
                      background="bg-sky-600"
                      fontSize="text-base"
                      text={`${post ? "Cập nhật" : "Đăng"}`}
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
            content={`${post ? "Cập nhật thành công" : "Đăng bài thành công"}`}
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
export default CreatePostModal;
