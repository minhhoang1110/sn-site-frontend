import Icon from "@/icons";
import React, { useState } from "react";
interface Props {
  handleUpdatePost: any;
  handleDeletePost: any;
}
const PostItemOption: React.FC<Props> = ({
  handleUpdatePost,
  handleDeletePost,
}) => {
  const [openOption, setOpenOption] = useState<boolean>(false);
  const OptionItem = (icon: string, text: string, func: any) => {
    return (
      <li>
        <div
          className="cursor-pointer flex items-center p-3 bg-white hover:bg-gray-300"
          onClick={func}
        >
          <Icon icon={icon} />
          <div className="ml-2">{text}</div>
        </div>
      </li>
    );
  };
  return (
    <div className="relative">
      <div
        className="cursor-pointer p-2"
        onClick={() => setOpenOption((prev) => !prev)}
      >
        <Icon icon="ellipsis-vertical" />
      </div>
      {openOption && (
        <ul className="bg-white border border-solid border-gray-200 shadow-md rounded-md absolute top-full right-0 w-52">
          {OptionItem("pencil-square", "Chỉnh sửa bài viết", handleUpdatePost)}
          {OptionItem("trash", "Xoá bài viết", handleDeletePost)}
        </ul>
      )}
    </div>
  );
};
export default PostItemOption;
