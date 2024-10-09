import { configureStore } from "@reduxjs/toolkit";
import getReduser from "./Slice";
const store = configureStore({
  reducer: getReduser,
});
export default store;
