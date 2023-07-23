import { CreateFriendshipBody, Friendship } from "@/types/DataObject";
import React from "react";
import Avatar from "../commons/Avatar";
import moment from "moment";
import { DateTimeFormat, FriendshipStateFriend } from "@/configs/constants";
import Button from "../commons/Button";
import { useAuthentication } from "@/hooks";
import { FriendshipAPI } from "@/api";
import { useRouter } from "next/router";
import { getAvatarPlaceholder } from "@/helper/componentData";
interface Props {
  friendships: Friendship[];
}
const RequestedFriendList: React.FC<Props> = ({ friendships }) => {
  const { session } = useAuthentication();
  const router = useRouter();
  const handleFriendRequest = (state: string, friendship: Friendship) => {
    if (!session || !session.accessToken || !session.user) return;
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
      secondUserId: friendship.firstUserId,
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
    <div className="w-full bg-white p-3 rounded-md shadow-md my-3">
      <h2 className="font-bold text-2xl pb-2 mb-3 border-b border-solid border-gray-300">
        Lời mời kết bạn
      </h2>
      {friendships &&
        friendships.length > 0 &&
        friendships.map((friendship, index) => (
          <div key={index} className="w-full p-3 flex items-center">
            <Avatar
              url={friendship.firstUser.avatarUrl || ""}
              size="lg"
              placeholder={getAvatarPlaceholder(friendship.firstUser)}
            />
            <div className="text-left ml-2 w-auto md:w-3/4">
              <div className="flex items-start md:items-center flex-col md:flex-row justify-between">
                <span className="font-bold text-xl p-1">
                  {`${friendship.firstUser.firstName} ${friendship.firstUser.lastName}` ||
                    ""}
                </span>
                <span className="text-gray-400">
                  {moment(new Date(friendship.updatedAt)).format(
                    DateTimeFormat
                  )}
                </span>
              </div>
              <div className="flex items-start md:items-center flex-col md:flex-row mt-2">
                <div className="mr-2 mb-2 md:mb-0">
                  <Button
                    background="bg-sky-600"
                    fontSize="text-base"
                    lineHeight="leading-10"
                    text="Đồng ý"
                    type="button"
                    textColor="white"
                    width="auto"
                    eventFuntion={() =>
                      handleFriendRequest(FriendshipStateFriend, friendship)
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
                  eventFuntion={() => handleFriendRequest("", friendship)}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default RequestedFriendList;
