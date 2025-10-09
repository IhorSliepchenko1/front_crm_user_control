import type { PageDetails } from "@/types";

export type NotificationItem = {
  read_id: string;
  read_status: boolean;
  subject: string;
  message: string;
  sender_name: string;
  sender_id: string;
  recipients: string[];
  task_name: string;
  task_id: string;
};

export type NotificationData = {
  notifications: NotificationItem[];
} & PageDetails & { count_no_read: number };
