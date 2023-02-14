import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./slices/headerSlice";
import counterReducer from "./slices/counterSlice";
export const store = configureStore({
  reducer: { counter: counterReducer, header: headerReducer },
});
