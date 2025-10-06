import { Modal } from "@mantine/core";
import UpdateCreatorTaskForm from "../forms/UpdateCreatorTaskForm";
import type { User } from "@/app/services/user/userTypes";

type Props = {
  opened: boolean;
  close: () => void;
  taskId: string;
  name: string;
  deadline: string;
  taskDescription: string;
  participants: User[];
};

const UpdateCreatorTaskModal: React.FC<Props> = ({
  opened,
  close,
  taskId,
  taskDescription,
  deadline,
  name,
  participants,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      size="xl"
      title="Заполните форму для отправки задачи на проверку"
    >
      <UpdateCreatorTaskForm
        taskId={taskId}
        close={close}
        taskDescription={taskDescription}
        name={name}
        deadline={deadline}
        participants={participants}
      />
    </Modal>
  );
};

export default UpdateCreatorTaskModal;
