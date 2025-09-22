import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse } from "@/types";
import type { Register } from "react-router-dom";
import type { Login, UserRoles } from "./authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse, Register>({
      query: (body) => ({
        url: `/auth/register`,
        method: METHODS.POST,
        body,
      }),
    }),

    login: builder.mutation<ApiResponse, Login>({
      query: (body) => ({
        url: `/auth/login`,
        method: METHODS.POST,
        body,
      }),
    }),

    logoutMe: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: `/auth/logout/me`,
        method: METHODS.POST,
      }),
    }),

    logoutById: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/auth/logout/${id}`,
        method: METHODS.POST,
      }),
    }),

    getMe: builder.query<
      { roles: UserRoles; avatarPath: string | null; name: string },
      void
    >({
      query: () => ({
        url: `/auth/me`,
        method: METHODS.GET,
      }),
    }),

    // refresh: builder.mutation<ApiResponse, void>({
    //   query: () => ({
    //     url: `/auth/refresh`,
    //     method: METHODS.POST,
    //   }),
    // }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useLoginMutation,
  useLogoutByIdMutation,
  useLogoutMeMutation,
  useRegisterMutation,
} = authApi;
