import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../slices";
import mainSlice from "@app/features/main/slices";

const reducer = {
  dialog: appReducer.dialogSlice,
  main: mainSlice,
};

const rootReducer = combineReducers(reducer);
export default rootReducer;
