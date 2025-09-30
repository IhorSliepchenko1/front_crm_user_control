import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse } from "@/types";
import type { TaskByProjectId, TaskItem } from "./tasksTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<
      ApiResponse,
      {
        projectId: string;
        name: string;
        deadline: string;
        executors: string[];
        // formData: FormData;
        taskDescription?: string;
      }
    >({
      query: ({ projectId, name, deadline, taskDescription, executors }) => ({
        url: `/task/create`,
        method: METHODS.POST,
        body: { name, deadline, taskDescription, executors },
        params: { projectId },
      }),
    }),

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
  }),
});

export const {
  useLazyTaskByProjectIdQuery,
  useTaskByProjectIdQuery,
  useAddTaskMutation,
} = authApi;
