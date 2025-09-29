import TableScrolContainer from "../UI/TableScrolContainer";
import TaskHeader from "../tables/headers/TaskHeader";
import TaskRows from "../tables/rows/TaskRows";
import type { TaskItem } from "@/app/services/tasks/tasksTypes";
import { Button, NativeSelect, Table } from "@mantine/core";
import Pagination from "../UI/Pagination";

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

  open: () => void;
};

const TaskData: React.FC<Props> = ({
  tasks,
  limit,
  total,
  setPage,
  setLimit,
  setStatus,
  open,
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

  return (
    <div className="">
      <div className="flex mb-5 justify-between items-center">
        <div className="flex gap-10">
          <NativeSelect
            value={limit}
            label={"К-во"}
            onChange={(event) => setLimit(+event.currentTarget.value)}
            data={["25", "50", "75", "100"]}
          />
          <NativeSelect
            label={"Статус"}
            onChange={(event) =>
              setStatus(changeStatus(event.currentTarget.value))
            }
            data={["все", "в процессе", "на проверке", "выполнено", "отменено"]}
          />
        </div>

        <Button variant="default" onClick={open}>
          выбрать дату
        </Button>
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
        <p className="text-center">Задачи ещё не назначены</p>
      )}
      <Pagination total={total} setPage={setPage} />
    </div>
  );
};

export default TaskData;
