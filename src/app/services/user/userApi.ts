import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse } from "@/types";
import type { GetUserData, GetUsersData, GetUsersQuery } from "./userTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<GetUsersData>, GetUsersQuery>({
      query: ({ page, limit, active }) => ({
        url: `/users`,
        method: METHODS.GET,
        params: { page, limit, active },
      }),
    }),

    userById: builder.mutation<ApiResponse<{ data: GetUserData }>, string>({
      query: (id) => ({
        url: `/users/user/${id}`,
        method: METHODS.GET,
      }),
    }),

    isActiveUser: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/users/is-active/${id}`,
        method: METHODS.PATCH,
      }),
    }),

    renameUserById: builder.mutation<
      ApiResponse,
      { id: string; login: string }
    >({
      query: ({ id, login }) => ({
        url: `/users/rename/${id}`,
        method: METHODS.PATCH,
        body: { login },
      }),
    }),

    changePasswodUserById: builder.mutation<
      ApiResponse,
      { id: string; newPassword: string; oldPassword: string }
    >({
      query: ({ id, newPassword, oldPassword }) => ({
        url: `/users/change-password/${id}`,
        method: METHODS.PATCH,
        body: { newPassword, oldPassword },
      }),
    }),

    changeAvatarUserById: builder.mutation<ApiResponse, { files: Array<File> }>(
      {
        query: ({ files }) => ({
          url: `/users/change-avatar`,
          method: METHODS.PATCH,
          body: { files },
        }),
      }
    ),
  }),
});

export const {
  useChangeAvatarUserByIdMutation,
  useChangePasswodUserByIdMutation,
  useGetUsersQuery,
  useIsActiveUserMutation,
  useLazyGetUsersQuery,
  useRenameUserByIdMutation,
  useUserByIdMutation,
} = authApi;
