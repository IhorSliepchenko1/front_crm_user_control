import { Modal } from "@mantine/core";
import AddTask from "../forms/AddTask";
import type { User } from "@/app/services/user/userTypes";
import type { TModal } from "@/app/services/tasks/tasksTypes";
import type { TProjectQuery } from "@/app/services/projects/projectsTypes";

type Props = {
  modal: TModal;
  opened: boolean;
  close: () => void;
  projectQuery: TProjectQuery;
  participants: User[];
};

const AddTaskModal: React.FC<Props> = ({
  modal,
  opened,
  close,
  projectQuery,
  participants,
}) => {
  return (
    modal === "addTask" && (
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title="Заполните форму для назначения задачи"
      >
        <AddTask
          projectQuery={projectQuery}
          participants={participants}
          close={close}
        />
      </Modal>
    )
  );
};

export default AddTaskModal;
