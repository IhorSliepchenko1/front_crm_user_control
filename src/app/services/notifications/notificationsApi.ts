import { METHODS } from "@/utils/methods";
import { api } from "../api";
import type { ApiResponse, Pagination } from "@/types";
import type { NotificationData } from "./notificationsTypes";

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    notifications: builder.query<ApiResponse<NotificationData>, Pagination>({
      query: ({ page, limit, isRead }) => ({
        url: `/notification/all`,
        method: METHODS.GET,
        params: { page, limit, isRead },
      }),
    }),

    readNotification: builder.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/notification/read/${id}`,
        method: METHODS.PATCH,
      }),
    }),
  }),
});

export const {
  useNotificationsQuery,
  useLazyNotificationsQuery,
  useReadNotificationMutation,
} = notificationsApi;
