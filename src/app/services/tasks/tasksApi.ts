import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse } from "@/types";
import type {
  TaskById,
  TaskByProjectId,
  TaskByProjectIdResponse,
} from "./tasksTypes";
import type { Status, TProjectQuery } from "../projects/projectsTypes";

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

    updateExecutorByTaskId: builder.mutation<
      ApiResponse,
      {
        formData: FormData;
        taskId: string;
      }
    >({
      query: ({ formData, taskId }) => {
        return {
          url: `/task/update-executor/${taskId}`,
          method: METHODS.PUT,
          body: formData,
          params: { taskId },
        };
      },
    }),

    updateCreatorByTaskId: builder.mutation<
      ApiResponse,
      {
        formData: FormData;
        taskId: string;
      }
    >({
      query: ({ formData, taskId }) => {
        return {
          url: `/task/update-creator/${taskId}`,
          method: METHODS.PUT,
          body: formData,
          params: { taskId },
        };
      },
    }),

    deleteFileTask: builder.mutation<
      ApiResponse,
      {
        fileId: string;
        taskId: string;
      }
    >({
      query: ({ fileId, taskId }) => {
        return {
          url: `task/file-delete`,
          method: METHODS.DELETE,
          params: { fileId, taskId },
        };
      },
    }),

    changeStatus: builder.mutation<
      ApiResponse,
      {
        status: Status;
        taskId: string;
      }
    >({
      query: ({ status, taskId }) => {
        return {
          url: `task/change-status`,
          method: METHODS.PATCH,
          params: { status, taskId },
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
  useUpdateExecutorByTaskIdMutation,
  useUpdateCreatorByTaskIdMutation,
  useDeleteFileTaskMutation,
  useChangeStatusMutation,
} = authApi;
