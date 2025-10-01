import { Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

export type Value = [string | null, string | null];
export type TModal = "calendar" | "addTask" | null;

type Props = {
  modal: TModal;
  value: [string | null, string | null];
  setValue: React.Dispatch<React.SetStateAction<Value>>;
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
