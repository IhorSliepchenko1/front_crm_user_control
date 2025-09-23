import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse, Pagination } from "@/types";
import type { GetProjectsData, ProjectCreate } from "./projectsTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation<ApiResponse, ProjectCreate>({
      query: (body) => ({
        url: `/projects/create`,
        method: METHODS.POST,
        body,
      }),
    }),

    isActiveProject: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/projects/is-active/${id}`,
        method: METHODS.PATCH,
      }),
    }),

    // logoutMe: builder.mutation<ApiResponse, void>({
    //   query: () => ({
    //     url: `/auth/logout/me`,
    //     method: METHODS.POST,
    //   }),
    // }),

    // logoutById: builder.mutation<ApiResponse, string>({
    //   query: (id) => ({
    //     url: `/auth/logout/${id}`,
    //     method: METHODS.POST,
    //   }),
    // }),

    projectAll: builder.query<
      ApiResponse<GetProjectsData>,
      Pagination & { my?: boolean }
    >({
      query: ({ page, limit, active, my }) => ({
        url: `/projects/all`,
        method: METHODS.GET,
        params: { page, limit, active, my },
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
  useAddProjectMutation,
  useLazyProjectAllQuery,
  useProjectAllQuery,
  useIsActiveProjectMutation,
} = authApi;
