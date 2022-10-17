import { configureStore } from "@reduxjs/toolkit";
import leaderSlice from "../Slices/leaderSlice";

const store = configureStore({
  reducer: {
    leaderSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
