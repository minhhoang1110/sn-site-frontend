import { User } from "@/types/DataObject";
import Link from "next/link";
import React from "react";
import EditableSearchField from "../EditableSearchField";
import DropdownMenu from "../DropdownMenu";
interface Props {
  user: User | null;
}
const Header: React.FC<Props> = ({ user }) => {
  return (
    <div className="h-14 w-screen bg-white shadow fixed top-0 left-0 z-10 py-1.5 px-4 flex items-center justify-between">
      <div className="absolute top-1/2 translate-y-1/-2 left-4">
        <Link href="/" className="text-sky-600 font-bold text-2xl p-1">
          SN Site
        </Link>
      </div>
      <EditableSearchField />
      <div className="absolute top-1/2 translate-y-1/-2 right-4">
        <DropdownMenu user={user} />
      </div>
    </div>
  );
};
export default Header;
