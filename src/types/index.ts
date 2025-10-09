export type ApiResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
};

export type Pagination = {
  page: number;
  limit: number;
  active?: boolean;
  userId?: string;
  isRead?: boolean;
  my?: boolean;
};

export type PageDetails = {
  total: number;
  count_pages: number;
  page: number;
  limit: number;
};

export type TypeGateway =
  | "NOTIFICATION"
  | "LOGOUT"
  | "TRIGGER_USERS"
  | "TRIGGER_TASKS"
  | "TRIGGER_PROJECTS";

export type SocketData = {
  subject: string;
  message: string;
  types: TypeGateway[];
};
