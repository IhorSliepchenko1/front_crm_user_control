import type { PageDetails } from "@/types";
import type { UserRoles } from "../auth/authTypes";

export type UserData = {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  creator_projects: number;
  participant_projects: number;
  count_tasks: number;
  done_tasks: number;
  in_reviews_tasks: number;
  in_progress_tasks: number;
  canceled_task: number;
  roles: UserRoles;
  avatarPath: string | null;
};
export type GetUsersData = {
  users: UserData[];
} & PageDetails;
