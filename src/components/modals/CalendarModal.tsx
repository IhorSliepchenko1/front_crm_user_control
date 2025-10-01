import type { CalendarValue, TModal } from "@/app/services/tasks/tasksTypes";
import { Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

type Props = {
  modal: TModal;
  value: [string | null, string | null];
  setValue: React.Dispatch<React.SetStateAction<CalendarValue>>;
  opened: boolean;
  close: () => void;
};

const CalendarModal: React.FC<Props> = ({
  modal,
  value,
  setValue,
  opened,
  close,
}) => {
  return (
    modal === "calendar" && (
      <Modal opened={opened} onClose={close} size="xs">
        <div className="flex justify-center items-center">
          <DatePicker type="range" value={value} onChange={setValue} />
        </div>
      </Modal>
    )
  );
};

export default CalendarModal;
