import { UserWithToken } from "@/types/DataObject";
import { Action } from "@/types/redux";
const setValueToStore = (value: UserWithToken): Action => {
  return { type: "SETVALUETOSTORE", payload: value };
};
const removeValueFromStore = (): Action => {
  return { type: "REMOVEVALUEFROMSTORE", payload: null };
};
const authenticationAction = { setValueToStore, removeValueFromStore };
export default authenticationAction;
