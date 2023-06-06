import { DateFormat } from "@/configs/constants";
import Icon from "@/icons";
import { User } from "@/types/DataObject";
import moment from "moment";
import React from "react";
interface Props {
  user: User | null;
}
const AboutUser: React.FC<Props> = ({ user }) => {
  return (
    <div className="w-full bg-white p-3 rounded-md shadow-md my-3">
      <h2 className="text-xl font-bold leading-10">Giới thiệu</h2>
      <div>
        <div>
          <h3 className="text-lg font-bold leading-10">Thông tin liên hệ</h3>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <Icon icon="mail" />
            </div>
            <div className="text-md">{user?.email || ""}</div>
          </div>
          <div className="flex items-center">
            <div className="mr-2">
              <Icon icon="phone" />
            </div>
            <div className="text-md">{user?.phone || ""}</div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold leading-10">Thông tin cơ bản</h3>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <Icon icon="cake" />
            </div>
            <div className="text-md">
              {moment(new Date(user?.dateOfBirth || "")).format(DateFormat)}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold leading-10">
            Giới thiệu về bản thân
          </h3>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <Icon icon="infor-circle" />
            </div>
            <div className="text-md">{user?.bio || ""}</div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold leading-10">Địa chỉ</h3>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <Icon icon="map-pin" />
            </div>
            <div className="text-md">{user?.address || ""}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUser;
