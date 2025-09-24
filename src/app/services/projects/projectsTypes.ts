import type { PageDetails } from "@/types";

export type ProjectCreate = {
  name: string;
  participants: string[];
};

export type ProjectItem = {
  id: string;
  creatorId: string;
  creator: string;
  created_at: string;
  count_participants: number;
  is_active: boolean;
  count_tasks: number;
  done_tasks: number;
  in_reviews_tasks: number;
  in_progress_tasks: number;
  canceled_task: number;
  name: string;
};

export type GetProjectsData = {
  projects: ProjectItem[];
} & PageDetails;

enum TaskStatus {
  IN_REVIEW,
  IN_PROGRESS,
  DONE,
  CANCELED,
}

export type ProjectByIdItem = {
  name: string;
  creator: {
    id: string;
    login: string;
  };
  participants: { id: string; login: string }[];

  tasks: {
    id: string;
    deadline: Date;
    name: string;
    status: TaskStatus;
    executors: {
      login: string;
    }[];
  }[];
};
