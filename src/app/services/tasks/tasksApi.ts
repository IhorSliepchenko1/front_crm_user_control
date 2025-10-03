import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse } from "@/types";
import type {
  TaskById,
  TaskByProjectId,
  TaskByProjectIdResponse,
} from "./tasksTypes";
import type { TProjectQuery } from "../projects/projectsTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<
      ApiResponse,
      {
        formData: FormData;
        projectId: string;
      }
    >({
      query: ({ formData, projectId }) => {
        return {
          url: `/task/create`,
          method: METHODS.POST,
          body: formData,
          params: { projectId },
        };
      },
    }),

    taskByProjectId: builder.query<
      ApiResponse<TaskByProjectIdResponse>,
      TaskByProjectId
    >({
      query: (query: TProjectQuery) => ({
        url: `/task/task-by-project`,
        method: METHODS.GET,
        params: query,
      }),
    }),

    taskById: builder.query<ApiResponse<TaskById>, string>({
      query: (id) => ({
        url: `/task/${id}`,
        method: METHODS.GET,
      }),
    }),
  }),
});

export const {
  useLazyTaskByProjectIdQuery,
  useTaskByProjectIdQuery,
  useAddTaskMutation,
  useLazyTaskByIdQuery,
  useTaskByIdQuery,
} = authApi;
