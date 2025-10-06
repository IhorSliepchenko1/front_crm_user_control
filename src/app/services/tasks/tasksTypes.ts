import type { Status } from "../projects/projectsTypes";
import type { User } from "../user/userTypes";

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
  executors: { login: string; id: string }[];
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

export type TFile = {
  id: string;
  fileName: string;
  type: "filePathTask" | "filePathExecutor";
};

export type TaskById = {
  name: string;
  executors: User[];
  participants: {
    id: string;
    login: string;
  }[];
  deadline: string;
  status: Status;
  executorDescription: string | null;
  taskDescription: string | null;
  files: TFile[];
  project: {
    creatorId: string;
    creator: {
      login: string;
    };
  };
};
