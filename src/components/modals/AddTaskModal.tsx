import { Modal } from "@mantine/core";
import AddTask, { type TProjectQuery } from "../forms/AddTask";
import type { User } from "@/app/services/user/userTypes";

export type Value = [string | null, string | null];
export type TModal = "calendar" | "addTask" | null;

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
