import TableScrolContainer from "../UI/TableScrolContainer";
import TaskHeader from "../tables/headers/TaskHeader";
import TaskRows from "../tables/rows/TaskRows";
import type { TaskItem } from "@/app/services/tasks/tasksTypes";
import { Button, NativeSelect, Table } from "@mantine/core";
import Pagination from "../UI/Pagination";
import { Plus } from "lucide-react";
import { useAppSelector } from "@/app/hooks";

type Props = {
  tasks: TaskItem[];
  total: number;
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<
    React.SetStateAction<
      "IN_PROGRESS" | "DONE" | "IN_REVIEW" | "CANCELED" | undefined
    >
  >;
  setModal: React.Dispatch<React.SetStateAction<"calendar" | "addTask" | null>>;
  open: () => void;
  creatorName: string;
};

const TaskData: React.FC<Props> = ({
  tasks,
  limit,
  total,
  setPage,
  setLimit,
  setStatus,
  open,
  setModal,
  creatorName,
}) => {
  const changeStatus = (value: string) => {
    switch (value) {
      case "все":
        return undefined;

      case "в процессе":
        return "IN_PROGRESS";

      case "выполнено":
        return "DONE";

      case "на проверке":
        return "IN_REVIEW";

      case "отменено":
        return "CANCELED";

      default:
        return undefined;
    }
  };
  const openModal = (modal: "calendar" | "addTask") => {
    setModal(modal);
    open();
  };
  const { userData } = useAppSelector((state) => state.auth);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex mb-5 gap-4 items-end">
          <NativeSelect
            value={limit}
            label={"К-во"}
            size="xs"
            onChange={(event) => setLimit(+event.currentTarget.value)}
            data={["25", "50", "75", "100"]}
          />
          <NativeSelect
            label={"Статус"}
            onChange={(event) =>
              setStatus(changeStatus(event.currentTarget.value))
            }
            size="xs"
            data={["все", "в процессе", "на проверке", "выполнено", "отменено"]}
          />
          <Button
            variant="default"
            onClick={() => openModal("calendar")}
            size="xs"
          >
            выбрать дату
          </Button>
        </div>
        {userData?.name === creatorName && (
          <Button
            leftSection={<Plus size={20} />}
            color="teal"
            onClick={() => openModal("addTask")}
            size="xs"
          >
            Добавить
          </Button>
        )}
      </div>
      {tasks?.length ? (
        <TableScrolContainer>
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            className="min-w-[1300px]"
          >
            <TaskHeader />
            <TaskRows tasks={tasks as TaskItem[]} />
          </Table>
        </TableScrolContainer>
      ) : (
        <p className="text-center">Данные отсутствуют</p>
      )}
      <Pagination total={total} setPage={setPage} />
    </div>
  );
};

export default TaskData;
