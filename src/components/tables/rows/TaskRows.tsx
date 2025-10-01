import type { Status } from "@/app/services/projects/projectsTypes";
import type { TaskItem } from "@/app/services/tasks/tasksTypes";
import { useTranslateStatus } from "@/hooks/useTranslateStatus";
import { Badge, Table } from "@mantine/core";

type Props = {
  tasks: TaskItem[];
};

const TaskRows: React.FC<Props> = ({ tasks }) => {
  const { translateToRender } = useTranslateStatus();

  const paintExpiredDeadline = (dateTime: string, status: Status) => {
    const now = new Date();
    const deadline = new Date(dateTime);

    return deadline < now && status !== "CANCELED" && status !== "DONE";
  };

  const rows = tasks.map((task, index) => (
    <Table.Tr key={index} className="text-[12px]">
      <Table.Td>{task.name}</Table.Td>
      <Table.Td>{new Date(task.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Badge color={translateToRender(task.status).color}>
          {translateToRender(task.status).text}
        </Badge>
      </Table.Td>
      <Table.Td>{task.executors.map((l) => l.login).join(", ")}</Table.Td>
      <Table.Td
        className={
          paintExpiredDeadline(task.deadline, task.status) ? "text-red-500" : ""
        }
      >
        {new Date(task.deadline).toLocaleString()}
      </Table.Td>
    </Table.Tr>
  ));
  return <Table.Tbody>{rows}</Table.Tbody>;
};

export default TaskRows;
