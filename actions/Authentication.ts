import { UserWithToken } from "@/types/DataObject";
import { Action } from "@/types/redux";
const setSessionToStore = (value: UserWithToken): Action => {
  return { type: "SETSESSIONTOSTORE", payload: value };
};
const removeSessionFromStore = (): Action => {
  return { type: "REMOVESESSIONFROMSTORE", payload: null };
};
const authenticationAction = { setSessionToStore, removeSessionFromStore };
export default authenticationAction;
