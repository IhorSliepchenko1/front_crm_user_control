import { notifications } from "@mantine/notifications";
import style from "./notification-message.module.scss";

type NotificationMessage = {
  type: "error" | "succeed";
  message: string;
};

export const useNotification = () => {
  const notificationMessage = ({ type, message }: NotificationMessage) =>
    notifications.show({
      color: type === "error" ? "red" : "green",
      title: type === "error" ? "Ошибка!" : "Успешно!",
      message: message,
      position: "top-right",
      classNames: style,
    });

  const succeed = (message: string) => {
    return notificationMessage({
      message: message,
      type: "succeed",
    });
  };

  const error = (message: string) => {
    return notificationMessage({
      message: message,
      type: "error",
    });
  };

  return { succeed, error };
};
