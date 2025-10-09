import { errorMessages } from "@/utils/is-error-message";
import { useNotification } from "./useNotification/useNotification";
import type { TypeGateway } from "@/types";
import { useLazyNotificationsQuery } from "@/app/services/notifications/notificationsApi";
import { useDispatch } from "react-redux";
import { cleanTypes } from "@/app/features/socketTypeSlice";

export const useTriggerData = (types: TypeGateway[] | null) => {
  const { error } = useNotification();
  const dispatch = useDispatch();
  const [triggerNotification] = useLazyNotificationsQuery();

  const onTrigger = async ({
    page,
    limit,
    isRead,
  }: {
    page: number;
    limit: number;
    isRead: boolean;
  }) => {
    try {
      if (types && types.includes("NOTIFICATION")) {
        await triggerNotification({
          page,
          limit,
          isRead,
        }).unwrap();

        dispatch(cleanTypes());
        return;
      }
      return;
    } catch (err) {
      error(errorMessages(err));
    }
  };

  return { onTrigger };
};
