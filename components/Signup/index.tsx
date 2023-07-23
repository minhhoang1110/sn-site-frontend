import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../commons/Button";
import TextField from "../commons/TextField";
import SingleDatePicker from "../commons/SingleDatePicker";
import { SignupRequestBody, UserWithToken } from "@/types/DataObject";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { authenticationAction } from "@/actions";
import { AuthenticationAPI } from "@/api";
import Modal from "../commons/Modal";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Signup: React.FC<Props> = ({ open, setOpen }) => {
  const initValue: SignupRequestBody = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    dateOfBirth: new Date(),
  };
  const [values, setValues] = useState<SignupRequestBody>(initValue);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<String>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const cancelButtonRef = useRef(null);
  const handleSignup = (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    AuthenticationAPI.signup(values)
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
        setSignupError("Có lỗi xảy ra !!!!");
        setTimeout(() => setSignupError(""), 3000);
      })
      .catch((error) => {
        setIsSubmit(false);
        setSignupError("Có lỗi xảy ra !!!!");
        setTimeout(() => setSignupError(""), 3000);
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white">
                  <div>
                    <div className="mt-3 text-left">
                      <div className="border-b border-gray-300 border-solid px-4 pb-4 pt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-3xl font-semibold leading-10 text-black"
                        >
                          Đăng ký tài khoản mới
                        </Dialog.Title>
                        <p className="leading-6 text-gray-600">
                          Nhanh chóng và dễ dàng
                        </p>
                      </div>
                      <div className="mt-2 px-4 pb-4 pt-5">
                        <form onSubmit={handleSignup}>
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
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          <div className="mb-2">
                            <TextField
                              readOnly={false}
                              fontSize="text-base"
                              hasBorder={true}
                              id="email"
                              placeholder="Email"
                              required={true}
                              type="email"
                              width="w-full"
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
                              pattern="[0-9]{10}"
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          <div className="mb-2">
                            <TextField
                              readOnly={false}
                              fontSize="text-base"
                              hasBorder={true}
                              id="username"
                              placeholder="Tài khoản"
                              required={true}
                              type="text"
                              width="w-full"
                              values={values}
                              setValues={setValues}
                            />
                          </div>
                          <div className="mb-2">
                            <TextField
                              readOnly={false}
                              fontSize="text-base"
                              hasBorder={true}
                              id="password"
                              placeholder="Mật khẩu"
                              required={true}
                              type="password"
                              width="w-full"
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
                          {signupError && (
                            <div className="text-rose-700">{signupError}</div>
                          )}
                          <div className="text-xs mb-3">
                            <p>
                              Những người dùng khác của SN Site có thể đăng
                              những thông tin của bạn lên nền tảng.
                            </p>
                            <p>
                              Khi nhấn nút Tạo tài khoản thì bạn đã đồng ý với
                              điều khoảng, chính sách bảo mật và chính sách sử
                              dụng Cookie.
                            </p>
                          </div>
                          <div className="py-1.5 flex items-center justify-center">
                            <Button
                              fontSize="text-lg"
                              text="Tạo tài khoản"
                              type="submit"
                              width="3/5"
                              background="bg-green-600"
                              boldText
                              lineHeight={"leading-10"}
                              textColor="white"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <Modal
            content="Đang tạo tài khoản"
            hasFooter={false}
            open={isSubmit}
            setOpen={setIsSubmit}
            textAlign="center"
            fontSize="xl"
            boldText
          />
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Signup;
