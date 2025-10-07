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
};

export type PageDetails = {
  total: number;
  count_pages: number;
  page: number;
  limit: number;
};
