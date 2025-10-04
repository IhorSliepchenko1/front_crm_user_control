import { Modal } from "@mantine/core";
import UpdateExecutorTaskForm from "../forms/UpdateExecutorTaskForm";

type Props = {
  opened: boolean;
  close: () => void;
  taskId: string;
  executorDescription: string;
};

const UpdateExecutorTaskModal: React.FC<Props> = ({
  opened,
  close,
  taskId,
  executorDescription,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      size="xl"
      title="Заполните форму для отправки задачи на проверку"
    >
      <UpdateExecutorTaskForm
        taskId={taskId}
        close={close}
        executorDescription={executorDescription}
      />
    </Modal>
  );
};

export default UpdateExecutorTaskModal;
