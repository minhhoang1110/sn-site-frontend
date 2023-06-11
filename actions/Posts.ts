import { Post } from "@/types/DataObject";
import { Action } from "@/types/redux";

const setPostsToStore = (value: Post[]): Action => {
  return { type: "SETPOSTSTOSTORE", payload: value };
};
const postsAction = { setPostsToStore };
export default postsAction;
