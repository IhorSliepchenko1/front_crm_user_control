import TableScrolContainer from "../UI/TableScrolContainer";
import TaskHeader from "../tables/headers/TaskHeader";
import TaskRows from "../tables/rows/TaskRows";
import type { TaskItem } from "@/app/services/tasks/tasksTypes";
import { Button, NativeSelect, Table } from "@mantine/core";
import Pagination from "../UI/Pagination";
import { Plus } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import type {
  Status,
  TProjectQuery,
} from "@/app/services/projects/projectsTypes";
import { useTranslateStatus } from "@/hooks/useTranslateStatus";
import { myInfo } from "@/app/features/authSlice";

type Props = {
  tasks: TaskItem[];
  total: number;
  page: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setStatus: React.Dispatch<React.SetStateAction<Status | undefined>>;
  setModal: React.Dispatch<React.SetStateAction<"calendar" | "addTask" | null>>;
  open: () => void;
  creatorName: string;
  projectQuery: TProjectQuery;
};

const TaskData: React.FC<Props> = ({
  tasks,
  limit,
  total,
  creatorName,
  open,
  setStatus,
  setPage,
  setLimit,
  setModal,
  projectQuery,
}) => {
  const { translateToChange } = useTranslateStatus();

  const openModal = (modal: "calendar" | "addTask") => {
    setModal(modal);
    open();
  };
  const { name } = useAppSelector(myInfo);

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
              setStatus(translateToChange(event.currentTarget.value))
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
        {name === creatorName && (
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
            <TaskRows tasks={tasks} projectQuery={projectQuery} />
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
