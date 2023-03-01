import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./slices/headerSlice";
import counterReducer from "./slices/counterSlice";
import boardReducer from "./slices/boardSlice";
import mouseReducer from "./slices/mouseSlice";
import storeReducer from "./slices/animationSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    header: headerReducer,
    board: boardReducer,
    mouse: mouseReducer,
    store: storeReducer,
  },
});
