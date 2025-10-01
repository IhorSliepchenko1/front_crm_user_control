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
  createdAt: string;
  deadline: string;
  executors: { login: string }[];
  name: string;
  status: Status;
};
