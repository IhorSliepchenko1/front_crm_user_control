import { Outlet } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { myInfo } from "@/app/features/authSlice";
import { notifications } from "@mantine/notifications";

const socket = io("http://localhost:3000");

const Layout = () => {
  const userId = useSelector(myInfo).userId;

  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);
    }

    socket.on("notification", (data: { subject: string; message: string }) => {
      notifications.show({
        title: data.subject,
        message: data.message,
      });
    });

    return () => {
      socket.off("notification");
    };
  }, [userId]);

  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
};

export default Layout;
