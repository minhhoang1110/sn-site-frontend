import { combineReducers } from "@reduxjs/toolkit";
import AuthenticationReducer from "./Authentication";
import PostsReducer from "./Posts";
const reducers = combineReducers({ AuthenticationReducer, PostsReducer });
export default reducers;
