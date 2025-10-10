import { useEffect } from "react";
import { socket } from "@/socket";
import { useDispatch, useSelector } from "react-redux";
import { myInfo } from "@/app/features/authSlice";
import { notifications } from "@mantine/notifications";
import type { SocketData } from "@/types";
import { addTypes } from "@/app/features/socketTypeSlice";

export const useSocketConnection = () => {
  const userId = useSelector(myInfo).userId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    if (!socket.connected) {
      socket.connect();
      socket.emit("register", userId);
    }

    socket.on("notification", (data: SocketData) => {
      const { subject: title, message, taskId, projectId } = data;
      dispatch(addTypes({ taskId, projectId }));

      notifications.show({
        title,
        message,
      });
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, []);
};
