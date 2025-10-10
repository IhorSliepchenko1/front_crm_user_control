import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import {
  useLazyNotificationsQuery,
  useNotificationsQuery,
} from "@/app/services/notifications/notificationsApi";
import { Bell } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import NotificationModal from "../modals/NotificationModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socketType } from "@/app/features/socketTypeSlice";
import { useTriggerData } from "@/hooks/useTriggerData";

const defaultNotificationData = [
  {
    read_id: "",
    read_status: false,
    subject: "",
    message: "",
    sender_name: "",
    sender_id: "",
    recipients: [""],
    task_name: "",
    task_id: "",
  },
];

const Main = () => {
  useSocketConnection();
  const [isRead, setIsRead] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;
  const { data, isLoading } = useNotificationsQuery({
    page,
    limit,
    isRead,
  });

  const notificationsData =
    data?.data?.notifications ?? defaultNotificationData;
  const countNoRead = data?.data?.count_no_read ?? 0;
  const total = data?.data?.count_pages ?? 1;
  const [opened, { open, close }] = useDisclosure(false);
  const { taskId } = useSelector(socketType);
  const { onTrigger } = useTriggerData(taskId);

  useEffect(() => {
    onTrigger({
      page,
      limit,
      isRead,
    });
  }, [taskId]);

  return (
    <main>
      <section className="flex justify-between">
        <NavBar />
        <div className="w-[90vw] px-3 pt-10 mx-auto">
          {!isLoading && (
            <button className="fixed top-0 right-0 p-4 cursor-pointer">
              <Bell onClick={open} />
              <div
                style={{
                  color: "white",
                  height: "15px",
                  width: "15px",
                  borderRadius: "50%",
                  background: "red",
                  fontSize: "7px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  bottom: "30px",
                  left: "12px",
                }}
              >
                <span>{countNoRead}</span>
              </div>
            </button>
          )}
          <Outlet />
        </div>
      </section>
      <NotificationModal
        opened={opened}
        close={close}
        setIsRead={setIsRead}
        total={total}
        setPage={setPage}
        data={notificationsData}
        page={page}
        limit={limit}
        isRead={isRead}
      />
    </main>
  );
};

export default Main;
