import {
  useDeleteFileTaskMutation,
  useLazyTaskByIdQuery,
} from "@/app/services/tasks/tasksApi";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Button, Group, Modal, Text } from "@mantine/core";

type Props = {
  fileId: string;
  taskId: string;
  opened: boolean;
  close: () => void;
  type: "filePathTask" | "filePathExecutor";
};

const DeleteTaskFileModal: React.FC<Props> = ({
  fileId,
  taskId,
  opened,
  close,
  type,
}) => {
  const [deleteFile] = useDeleteFileTaskMutation();
  const [triggerTaskById] = useLazyTaskByIdQuery();
  const { succeed, error } = useNotification();
  const messageFilePathTask = `Вы уверены в удалении файла?`;
  const messageFilePathExecutor = `При удалении файла исполнителя, задача перейдёт в статус 'в процессе'. Уверены в удалении?`;

  const onSubmit = async () => {
    try {
      const { message } = await deleteFile({ fileId, taskId }).unwrap();
      await triggerTaskById(taskId).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    } finally {
      close();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size="lg"
      title="Подтвердите действие"
    >
      <div className="mb-5"> 
        <Text>
          {type === "filePathExecutor"
            ? messageFilePathExecutor
            : messageFilePathTask}
        </Text>
      </div>

      <Group justify="space-between">
        <Button variant="light" color="default" onClick={close}>
          закрыть
        </Button>
        <Button variant="light" color="red" onClick={onSubmit}>
          подтвердить
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteTaskFileModal;
