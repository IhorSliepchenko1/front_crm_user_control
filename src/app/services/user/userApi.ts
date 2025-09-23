import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse, Pagination } from "@/types";
import type { GetUsersData } from "./userTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<ApiResponse<GetUsersData>, Pagination>({
      query: ({ page, limit, active }) => ({
        url: `/users`,
        method: METHODS.GET,
        params: { page, limit, active },
      }),
    }),

    getUsersProject: builder.query<
      ApiResponse<{ id: string; login: string }[]>,
      void
    >({
      query: () => ({
        url: `/users/for-project`,
        method: METHODS.GET,
      }),
    }),

    userById: builder.query<
      ApiResponse<{ title: string; value: any }[]>,
      string
    >({
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

    // renameUserById: builder.mutation<
    //   ApiResponse,
    //   { id: string; login: string }
    // >({
    //   query: ({ id, login }) => ({
    //     url: `/users/rename/${id}`,
    //     method: METHODS.PATCH,
    //     body: { login },
    //   }),
    // }),

    // changePasswodUserById: builder.mutation<
    //   ApiResponse,
    //   { id: string; newPassword: string; oldPassword: string }
    // >({
    //   query: ({ id, newPassword, oldPassword }) => ({
    //     url: `/users/change-password/${id}`,
    //     method: METHODS.PATCH,
    //     body: { newPassword, oldPassword },
    //   }),
    // }),

    // changeAvatarUserById: builder.mutation<ApiResponse, { files: Array<File> }>(
    //   {
    //     query: ({ files }) => ({
    //       url: `/users/change-avatar`,
    //       method: METHODS.PATCH,
    //       body: { files },
    //     }),
    //   }
    // ),

    updateUserById: builder.mutation<
      ApiResponse,
      {
        formData: FormData;
        id: string;
      }
    >({
      query: ({ formData, id }) => ({
        url: `/users/update-user/${id}`,
        method: METHODS.PUT,
        body: formData,
      }),
    }),
  }),
});

export const {
  // useChangeAvatarUserByIdMutation,
  // useChangePasswodUserByIdMutation,
  // useRenameUserByIdMutation,
  useGetUsersQuery,
  useIsActiveUserMutation,
  useLazyGetUsersQuery,
  useLazyUserByIdQuery,
  useUserByIdQuery,
  useUpdateUserByIdMutation,
  useGetUsersProjectQuery,
  useLazyGetUsersProjectQuery,
} = authApi;
