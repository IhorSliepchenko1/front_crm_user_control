import { Modal } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { Mail, MailOpen } from "lucide-react";
import Pagination from "../UI/Pagination";
import NotificationData from "../data/NotificationData";
import type { NotificationItem } from "@/app/services/notifications/notificationsTypes";

type Props = {
  opened: boolean;
  close: () => void;
  setIsRead: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: NotificationItem[];

  page: number;
  limit: number;
  isRead: boolean;
};

const NotificationModal: React.FC<Props> = ({
  opened,
  close,
  setIsRead,
  total,
  setPage,
  data,
  page,
  limit,
  isRead,
}) => {
  return (
    <Modal opened={opened} onClose={close} title="Уведомления" size={`80%`}>
      <Tabs defaultValue="no-read">
        <Tabs.List>
          <Tabs.Tab
            value="no-read"
            leftSection={<Mail size={12} />}
            onClick={() => setIsRead(false)}
          >
            Новые
          </Tabs.Tab>
          <Tabs.Tab
            value="read"
            leftSection={<MailOpen size={12} />}
            onClick={() => setIsRead(true)}
          >
            Прочитанные
          </Tabs.Tab>
        </Tabs.List>
        {["no-read", "read"].map((value) => (
          <Tabs.Panel value={value}>
            {
              <NotificationData
                data={data}
                page={page}
                limit={limit}
                isRead={isRead}
              />
            }
          </Tabs.Panel>
        ))}
      </Tabs>

      <Pagination total={total} setPage={setPage} />
    </Modal>
  );
};

export default NotificationModal;
