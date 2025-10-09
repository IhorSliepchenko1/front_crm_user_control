import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse, Pagination } from "@/types";
import type {
  GetProjectsData,
  ProjectByIdItem,
  ProjectCreate,
} from "./projectsTypes";

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

    changeParticipantsProject: builder.mutation<
      ApiResponse,
      { id: string; ids: string[]; key: "connect" | "disconnect" }
    >({
      query: ({ id, ids, key }) => ({
        url: `/projects/participants/${id}`,
        method: METHODS.PATCH,
        body: { ids, key },
      }),
    }),

    projectById: builder.query<
      ApiResponse<{ project: ProjectByIdItem }>,
      string
    >({
      query: (id) => ({
        url: `/projects/project/${id}`,
        method: METHODS.GET,
      }),
    }),

    projectAll: builder.query<ApiResponse<GetProjectsData>, Pagination>({
      query: ({ page, limit, active, my }) => ({
        url: `/projects/all`,
        method: METHODS.GET,
        params: { page, limit, active, my },
      }),
    }),

    projectsWithMe: builder.query<ApiResponse<GetProjectsData>, Pagination>({
      query: ({ page, limit, userId }) => ({
        url: `/projects/projects-with-me`,
        method: METHODS.GET,
        params: { page, limit, userId },
      }),
    }),

    renameProject: builder.mutation<ApiResponse, { name: string; id: string }>({
      query: ({ name, id }) => ({
        url: `/projects/rename/${id}`,
        method: METHODS.PATCH,
        body: { name },
      }),
    }),
  }),
});

export const {
  useAddProjectMutation,
  useLazyProjectAllQuery,
  useProjectAllQuery,
  useIsActiveProjectMutation,
  useLazyProjectByIdQuery,
  useProjectByIdQuery,
  useChangeParticipantsProjectMutation,
  useRenameProjectMutation,
  useLazyProjectsWithMeQuery,
  useProjectsWithMeQuery,
} = authApi;
