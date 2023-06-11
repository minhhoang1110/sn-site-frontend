import { Post } from "@/types/DataObject";
import { Action } from "@/types/redux";

const initValue: Post[] = [] as Post[];
const PostsReducer = (state: Post[] = initValue, action: Action) => {
  switch (action.type) {
    case "SETPOSTSTOSTORE":
      return action.payload;
    default:
      return state;
  }
};
export default PostsReducer;
