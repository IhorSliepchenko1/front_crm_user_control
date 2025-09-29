export type TaskByProjectId = {
  page: number;
  limit: number;
  status?: "IN_REVIEW" | "IN_PROGRESS" | "DONE" | "CANCELED" | "ALL";
  deadlineFrom?: string;
  deadlineTo?: string;
  projectId: string;
};

export type TaskItem = {
  createdAt: string;
  deadline: string;
  executors: { login: string }[];
  name: string;
  status: "IN_REVIEW" | "IN_PROGRESS" | "DONE" | "CANCELED";
};
// b9e62b34-6437-4e7f-abb7-bdcf92513b5e
