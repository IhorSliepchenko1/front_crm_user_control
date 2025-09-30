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
