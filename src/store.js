import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./slices/headerSlice";
import boardReducer from "./slices/boardSlice";
import mouseReducer from "./slices/mouseSlice";
import animationReducer from "./slices/animationSlice";
export const store = configureStore({
  reducer: {
    header: headerReducer,
    board: boardReducer,
    mouse: mouseReducer,
    animation: animationReducer,
  },
});
