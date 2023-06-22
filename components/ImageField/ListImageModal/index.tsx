/* eslint-disable react-hooks/exhaustive-deps */
import { useFiles } from "@/hooks";
import Icon from "@/icons";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useEffect, useRef } from "react";
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  values: any;
  setValues: any;
  userId: number;
  handleOnSelectImage: any;
}
const ListImageModal: React.FC<Props> = ({
  open,
  setOpen,
  setValues,
  userId,
  values,
  handleOnSelectImage,
}) => {
  const { files, filesLoading, setFileParam, loadFiles } = useFiles();
  const cancelButtonRef = useRef(null);
  useEffect(() => {
    if (userId) {
      setFileParam({ userId });
    }
  }, [userId]);
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
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
                    Chọn ảnh từ thư viện
                  </Dialog.Title>
                  {files && files.length > 0 && (
                    <div className="p-3 flex flex-wrap">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          style={{
                            backgroundImage: `url('${file.url}')`,
                          }}
                          className="border border-gray-300 border-solid bg-white bg-contain bg-center bg-no-repeat w-32 h-20 md:w-48 md:h-36 mr-3 mb-3 cursor-pointer"
                          onClick={() => handleOnSelectImage(file.url)}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ListImageModal;
