import { CreateFriendshipBody, Friendship, User } from "@/types/DataObject";
import React, { useState } from "react";
import Avatar from "../Avatar";
import Button from "../Button";
import { useRouter } from "next/router";
import Tabs from "../Tabs";
import {
  FriendshipStateFriend,
  FriendshipStateRequested,
  PROFILE_TABS_DATA,
} from "@/configs/constants";
import UpdateProfileModal from "../UpdateProfileModal";
import { useAuthentication } from "@/hooks";
import { FriendshipAPI } from "@/api";
import { getAvatarPlaceholder } from "@/helper/componentData";
interface Props {
  user: User | null;
  friendship: Friendship | null;
  showUpdateProfileButton: boolean;
  showAddFriendButton: boolean;
  showMessageButton: boolean;
}
const UserGeneralInformation: React.FC<Props> = ({
  user,
  showUpdateProfileButton,
  showAddFriendButton,
  showMessageButton,
  friendship,
}) => {
  const router = useRouter();
  const { session } = useAuthentication();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const { query } = useRouter();
  const paramValue: string | string[] = (query && query.view) || "";
  const paramId: string | string[] = (query && query.id) || "";
  const getFriendshipButtonText = () => {
    if (!session || !session.user) return "";
    if (!friendship) {
      return "Kết bạn";
    }
    if (
      friendship.state === FriendshipStateRequested &&
      friendship.firstUserId === session.user.id
    ) {
      return "Huỷ lời mời";
    }
    return "Huỷ kết bạn";
  };
  const handleFriendship = () => {
    if (!user || !session || !session.accessToken || !session.user) return;
    if (friendship === null) {
      const friendship: CreateFriendshipBody = {
        firstUserId: session.user.id,
        secondUserId: user.id,
        state: FriendshipStateRequested,
      };
      FriendshipAPI.createFriendship(friendship, session.accessToken)
        .then((res) => {
          if (res.data.success) {
            router.reload();
          }
        })
        .catch((error) => {});
      return;
    }
    FriendshipAPI.deleteFriendship(friendship.id, session.accessToken)
      .then((res) => {
        if (res.data.success) {
          router.reload();
        }
      })
      .catch((error) => {});
  };
  const handleFriendRequest = (state: string) => {
    if (
      !friendship ||
      !user ||
      !session ||
      !session.accessToken ||
      !session.user
    )
      return;
    if (!state) {
      FriendshipAPI.deleteFriendship(friendship.id, session.accessToken)
        .then((res) => {
          if (res.data.success) {
            router.reload();
          }
        })
        .catch((error) => {});
      return;
    }
    const updateFriendship: CreateFriendshipBody = {
      state,
      firstUserId: session.user.id,
      secondUserId: user.id,
    };
    FriendshipAPI.updateFriendship(
      friendship.id,
      updateFriendship,
      session.accessToken
    )
      .then((res) => {
        if (res.data.success) {
          router.reload();
        }
      })
      .catch((error) => {});
  };
  return (
    <div className="w-full bg-white from-slate-800 from-5% via-20% to-white to-50% bg-gradient-to-b shadow-md mt-3/r">
      <div className="w-full my-0 mx-auto max-w-3xl px-3.5 lg:px-0 ">
        <div
          className="min-h-240px md:min-h-460px overflow-hidden bg-gray-200 bg-contain bg-center bg-no-repeat rounded-b-md"
          style={{ backgroundImage: `url('${user && user.coverUrl}')` }}
        ></div>
        <div className="relative py-3 min-h-300px md:min-h-156px">
          <div className="flex flex-col md:flex-row justify-between md:items-end absolute left-0 top-1/-40px border-b border-gray-300 border-solid w-full pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end">
              <Avatar
                url={(user && user.avatarUrl) || ""}
                placeholder={getAvatarPlaceholder(user)}
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
                {showUpdateProfileButton && (
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
                )}
              </div>
            </div>

            <div className="ml-5 md:ml-0 md:text-right">
              {showAddFriendButton &&
                !(
                  friendship &&
                  session &&
                  session.user &&
                  friendship.state === FriendshipStateRequested &&
                  friendship.secondUserId === session.user.id
                ) && (
                  <div className="mt-3 mr-2 md:mr-0 inline-block md:block">
                    <Button
                      background={!friendship ? "bg-sky-600" : "bg-gray-300"}
                      fontSize="text-base"
                      lineHeight="leading-10"
                      text={getFriendshipButtonText()}
                      type="button"
                      textColor={!friendship ? "white" : "black"}
                      width="auto"
                      eventFuntion={handleFriendship}
                    />
                  </div>
                )}
              {showAddFriendButton &&
                friendship &&
                session &&
                session.user &&
                friendship.state === FriendshipStateRequested &&
                friendship.secondUserId === session.user.id && (
                  <div className="flex items-center mt-3 mr-2 md:mr-0">
                    <div className="mr-2">
                      <Button
                        background="bg-sky-600"
                        fontSize="text-base"
                        lineHeight="leading-10"
                        text="Đồng ý"
                        type="button"
                        textColor="white"
                        width="auto"
                        eventFuntion={() =>
                          handleFriendRequest(FriendshipStateFriend)
                        }
                      />
                    </div>

                    <Button
                      background="bg-gray-300"
                      fontSize="text-base"
                      lineHeight="leading-10"
                      text="Từ chối"
                      type="button"
                      textColor="black"
                      width="auto"
                      eventFuntion={() => handleFriendRequest("")}
                    />
                  </div>
                )}
              {showMessageButton && (
                <div className="mt-3 inline-block md:block">
                  <Button
                    background="bg-gray-300"
                    fontSize="text-base"
                    lineHeight="leading-10"
                    text="Nhắn tin"
                    type="button"
                    textColor="black"
                    width="auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <Tabs
          currentPath={`/profile/${paramId}`}
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
