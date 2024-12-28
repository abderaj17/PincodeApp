import { configureStore } from "@reduxjs/toolkit";
import pincodeReducer from "./pincodeSlice";

export const store = configureStore({
  reducer: {
    pincode: pincodeReducer,
  },
});
