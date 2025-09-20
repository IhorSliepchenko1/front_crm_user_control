import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth/authApi";
import type { RootState } from "../store";
import type { UserRoles } from "../services/auth/authTypes";

type InitialState = {
  userData: {
    roles: UserRoles;
    avatarPath: string | null;
    name: string;
  } | null;
};

const initialState: InitialState = {
  userData: null,
};

const slice = createSlice({
  name: `auth`,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, action) => {
        state.userData = action.payload;
      }
    );
  },
});

export const isAdminRole = (state: RootState) => {
  return state.auth.userData?.roles.includes("ADMIN");
};
export default slice.reducer;
