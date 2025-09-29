import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse } from "@/types";
import type { TaskByProjectId, TaskItem } from "./tasksTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //   addProject: builder.mutation<ApiResponse, ProjectCreate>({
    //     query: (body) => ({
    //       url: `/projects/create`,
    //       method: METHODS.POST,
    //       body,
    //     }),
    //   }),

    //   isActiveProject: builder.mutation<ApiResponse, string>({
    //     query: (id) => ({
    //       url: `/projects/is-active/${id}`,
    //       method: METHODS.PATCH,
    //     }),
    //   }),

    //   changeParticipantsProject: builder.mutation<
    //     ApiResponse,
    //     { id: string; ids: string[]; key: "connect" | "disconnect" }
    //   >({
    //     query: ({ id, ids, key }) => ({
    //       url: `/projects/participants/${id}`,
    //       method: METHODS.PATCH,
    //       body: { ids, key },
    //     }),
    //   }),

    //   projectById: builder.query<
    //     ApiResponse<{ project: ProjectByIdItem }>,
    //     string
    //   >({
    //     query: (id) => ({
    //       url: `/projects/project/${id}`,
    //       method: METHODS.GET,
    //     }),
    //   }),

    taskByProjectId: builder.query<
      ApiResponse<{
        tasks: TaskItem[];
        total: number;
        count_pages: number;
        page: number;
        limit: number;
      }>,
      TaskByProjectId
    >({
      query: ({
        page,
        limit,
        status,
        deadlineFrom,
        deadlineTo,
        projectId,
      }) => ({
        url: `/task/task-by-project`,
        method: METHODS.GET,
        params: { page, limit, status, deadlineFrom, deadlineTo, projectId },
      }),
    }),

    // renameProject: builder.mutation<ApiResponse, { name: string; id: string }>({
    //   query: ({ name, id }) => ({
    //     url: `/projects/rename/${id}`,
    //     method: METHODS.PATCH,
    //     body: { name },
    //   }),
    // }),
  }),
});

export const { useLazyTaskByProjectIdQuery, useTaskByProjectIdQuery } = authApi;
