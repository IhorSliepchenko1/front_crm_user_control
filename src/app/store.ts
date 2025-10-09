import {
  configureStore,
  type Action,
  type ThunkAction,
} from "@reduxjs/toolkit";
import { api } from "./services/api";
import auth from "./features/authSlice";
import socketTypes from "./features/socketTypeSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth,
    socketTypes,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
