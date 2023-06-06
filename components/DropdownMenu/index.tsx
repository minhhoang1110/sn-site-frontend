import React, { useState } from "react";
import Avatar from "../Avatar";
import { User } from "@/types/DataObject";
import Link from "next/link";
import Icon from "@/icons";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { authenticationAction } from "@/actions";
interface Props {
  user: User | null;
}
const DropdownMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const handleLogout = () => {
    dispatch(authenticationAction.removeValueFromStore());
    router.push("/login");
  };
  return (
    <div className="relative">
      <div onClick={() => setOpenDropdown(!openDropdown)}>
        <Avatar
          url={user?.avatarUrl || ""}
          size="md"
          placeholder={
            (user &&
              `${user.firstName.substring(0, 1)} ${user.lastName.substring(
                0,
                1
              )}`) ||
            ""
          }
        />
      </div>
      <div
        className={`w-96 bg-white shadow-md rounded-md p-3 absolute z-10 right-0 top-full ${
          openDropdown ? "block" : "hidden"
        }`}
      >
        <ul>
          <li className="mb-2">
            <div className="bg-white shadow-md rounded-md p-2">
              <Link
                href="/profile"
                className="flex items-center p-2 bg-white hover:bg-gray-300 rounded-md "
              >
                <div className="p-1">
                  <Avatar
                    url={user?.avatarUrl || ""}
                    size="md"
                    placeholder={
                      (user &&
                        `${user.firstName.substring(
                          0,
                          1
                        )} ${user.lastName.substring(0, 1)}`) ||
                      ""
                    }
                  />
                </div>
                <span className="font-bold p-1">
                  {(user && `${user.firstName} ${user.lastName}`) || ""}
                </span>
              </Link>
            </div>
          </li>
          <li className="mb-2">
            <Link
              href=""
              className="flex items-center p-2 bg-white hover:bg-gray-300 rounded-md "
              onClick={handleLogout}
            >
              <span className="font-bold p-1">Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="absolute left-2/3 top-1/2 z-10 bg-gray-300 rounded-full scale-75">
        <Icon icon="chevron-down" />
      </div>
    </div>
  );
};
export default DropdownMenu;
