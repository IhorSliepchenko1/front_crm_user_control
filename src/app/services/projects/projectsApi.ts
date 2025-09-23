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

    // login: builder.mutation<ApiResponse, Login>({
    //   query: (body) => ({
    //     url: `/auth/login`,
    //     method: METHODS.POST,
    //     body,
    //   }),
    // }),

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

    projectAll: builder.query<ApiResponse<GetProjectsData>, Pagination>({
      query: ({ page, limit, active }) => ({
        url: `/projects/all`,
        method: METHODS.GET,
        params: { page, limit, active },
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
} = authApi;
