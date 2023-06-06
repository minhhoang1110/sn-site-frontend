import { User } from "@/types/DataObject";
import React, { useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import { useRouter } from "next/router";
import Tabs from "../Tabs";
import { PROFILE_TABS_DATA } from "@/configs/constants";
import UpdateProfileModal from "../UpdateProfileModal";
interface Props {
  user: User | null;
}
const UserGeneralInformation: React.FC<Props> = ({ user }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { pathname, query } = useRouter();
  const paramValue: string | string[] = (query && query.view) || "";
  return (
    <div className="w-full bg-white from-slate-800 from-5% via-20% to-white to-50% bg-gradient-to-b shadow-md mt-3/r">
      <div className="w-full my-0 mx-auto max-w-3xl px-3.5 lg:px-0 ">
        <div
          className="min-h-240px md:min-h-460px overflow-hidden bg-gray-200 bg-contain bg-center bg-no-repeat rounded-b-md"
          style={{ backgroundImage: `url('${user && user.coverUrl}')` }}
        ></div>
        <div className="relative py-3 min-h-240px md:min-h-156px">
          <div className="flex flex-col md:flex-row items-center md:items-end absolute left-0 top-1/-40px border-b border-gray-300 border-solid w-full pb-6">
            <Avatar
              url={(user && user.avatarUrl) || ""}
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
            <div className="ml-3 text-center md:text-left">
              <div>
                <span className="font-bold text-4xl mr-2">
                  {(user && `${user.firstName} ${user.lastName}`) || ""}
                </span>
                <span className="text-gray-500">{`(${
                  (user && user.countOfFriends) || 0
                } bạn bè)`}</span>
              </div>
              <div className="mt-3">
                <Button
                  background="bg-gray-300"
                  fontSize="text-base"
                  lineHeight="leading-10"
                  text="Chỉnh sửa trang cá nhân"
                  type="button"
                  textColor="black"
                  width="auto"
                  eventFuntion={() => setOpenUpdateModal(true)}
                />
              </div>
            </div>
          </div>
        </div>
        <Tabs
          currentPath={pathname}
          data={PROFILE_TABS_DATA}
          paramKey="view"
          currentParamValue={paramValue.toString() || "posts"}
        />
      </div>
      <UpdateProfileModal
        user={user}
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
      />
    </div>
  );
};
export default UserGeneralInformation;
