import { configureStore } from "@reduxjs/toolkit";
import likeReducer from "./LikeSlice";

export const store = configureStore({
  reducer: {
    likedRecipes: likeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
