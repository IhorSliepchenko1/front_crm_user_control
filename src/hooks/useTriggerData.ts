import { errorMessages } from "@/utils/is-error-message";
import { useNotification } from "./useNotification/useNotification";
import { useLazyNotificationsQuery } from "@/app/services/notifications/notificationsApi";
import { useDispatch } from "react-redux";
import { cleanTypes } from "@/app/features/socketTypeSlice";

type Props = {
  page: number;
  limit: number;
  isRead: boolean;
};

export const useTriggerData = (taskId: string | null) => {
  const { error } = useNotification();
  const dispatch = useDispatch();
  const [triggerNotification] = useLazyNotificationsQuery();

  const onTrigger = async ({ page, limit, isRead }: Props) => {
    try {
      if (taskId) {
        await triggerNotification({
          page,
          limit,
          isRead,
        }).unwrap();
      }

      dispatch(cleanTypes());
    } catch (err) {
      error(errorMessages(err));
    }
  };

  return { onTrigger };
};
