import { UserWithToken } from "@/types/DataObject";
import { Action } from "@/types/redux";
const initValue: UserWithToken = {
  accessToken: "",
  refreshToken: "",
  user: null,
};
const AuthenticationReducer = (
  state: UserWithToken = initValue,
  action: Action
) => {
  switch (action.type) {
    case "SETVALUETOSTORE":
      localStorage.setItem("session", JSON.stringify(action.payload));
      return action.payload;
    case "REMOVEVALUEFROMSTORE":
      localStorage.removeItem("session");
      return action.payload;
    default:
      return state;
  }
};
export default AuthenticationReducer;
