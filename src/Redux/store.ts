import { configureStore } from "@reduxjs/toolkit";
import leaderSlice from "../Slices/leaderSlice";
import modalSlice from "../Slices/modalSice";

const store = configureStore({
  reducer: {
    leaderSlice,
    modalSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
