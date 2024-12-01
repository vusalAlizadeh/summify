import { configureStore } from "@reduxjs/toolkit";
import { articleAPI } from "../services/article";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [articleAPI.reducerPath]: articleAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleAPI.middleware),
});

setupListeners(store.dispatch);
