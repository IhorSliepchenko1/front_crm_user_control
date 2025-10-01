import type { Status } from "../projects/projectsTypes";

export type TaskByProjectId = {
  page: number;
  limit: number;
  status?: Status;
  deadlineFrom?: string;
  deadlineTo?: string;
  projectId: string;
};

export type TaskItem = {
  id: string;
  createdAt: string;
  deadline: string;
  executors: { login: string }[];
  name: string;
  status: Status;
};

export type CalendarValue = [string | null, string | null];
export type TModal = "calendar" | "addTask" | null;

export type TaskByProjectIdResponse = {
  tasks: TaskItem[];
  total: number;
  count_pages: number;
  page: number;
  limit: number;
};
