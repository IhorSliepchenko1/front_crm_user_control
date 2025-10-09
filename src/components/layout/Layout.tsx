import { Outlet } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { myInfo } from "@/app/features/authSlice";
// import { notifications } from "@mantine/notifications";
// import { socket } from "@/socket";

const Layout = () => {
  // const userId = useSelector(myInfo).userId;

  // useEffect(() => {
  //   if (!userId) return;

  //   if (!socket.connected) {
  //     socket.connect();
  //     socket.emit("register", userId);
  //   }

  //   socket.on("notification", (data: { subject: string; message: string }) => {
  //     notifications.show({
  //       title: data.subject,
  //       message: data.message,
  //     });
  //   });

  //   return () => {
  //     socket.off("notification");
  //   };
  // }, [userId]);

  return (
    <AuthGuard>
      <Outlet />
    </AuthGuard>
  );
};

export default Layout;
