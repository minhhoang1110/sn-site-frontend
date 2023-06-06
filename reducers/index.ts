import { combineReducers } from "@reduxjs/toolkit";
import AuthenticationReducer from "./Authentication";
const reducers = combineReducers({ AuthenticationReducer });
export default reducers;
