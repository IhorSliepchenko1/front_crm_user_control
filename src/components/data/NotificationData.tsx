import {
  useLazyNotificationsQuery,
  useReadNotificationMutation,
} from "@/app/services/notifications/notificationsApi";
import type { NotificationItem } from "@/app/services/notifications/notificationsTypes";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Button, Table } from "@mantine/core";

type Props = {
  data: NotificationItem[];
  page: number;
  limit: number;
  isRead: boolean;
};

const NotificationData: React.FC<Props> = ({ data, page, limit, isRead }) => {
  const [readById] = useReadNotificationMutation();
  const [triggerNotifications] = useLazyNotificationsQuery();
  const { succeed, error } = useNotification();

  const readNotificationById = async (id: string) => {
    try {
      const { message } = await readById(id).unwrap();
      await triggerNotifications({
        page,
        limit,
        isRead,
      }).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    }
  };

  const rows = data.map((element) => (
    <Table.Tr key={element.read_id}>
      <Table.Td>{element.subject}</Table.Td>
      <Table.Td>{element.message}</Table.Td>
      <Table.Td>{element.sender_name}</Table.Td>
      <Table.Td>{element.recipients.join(", ")}</Table.Td>
      <Table.Td>{element.task_name}</Table.Td>
      <Table.Td>
        {
          <Button
            variant="filled"
            color="teal"
            size="xs"
            radius="md"
            disabled={element.read_status}
            onClick={() => readNotificationById(element.read_id)}
          >
            прочитать
          </Button>
        }
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="p-3">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Тема</Table.Th>
            <Table.Th>Содержание</Table.Th>
            <Table.Th>Отправитель</Table.Th>
            <Table.Th>Получатели</Table.Th>
            <Table.Th>Задача</Table.Th>
            <Table.Th>Действие</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default NotificationData;
