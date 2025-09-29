import type { TaskItem } from "@/app/services/tasks/tasksTypes";
import { Badge, Table } from "@mantine/core";

type Props = {
  tasks: TaskItem[];
};

const TaskRows: React.FC<Props> = ({ tasks }) => {
  const translateStatus = (
    status: "IN_REVIEW" | "IN_PROGRESS" | "DONE" | "CANCELED"
  ) => {
    switch (status) {
      case "IN_PROGRESS":
        return { text: "в процессе", color: "yellow" };

      case "CANCELED":
        return { text: "отменено", color: "red" };

      case "DONE":
        return { text: "выполнено", color: "green" };

      case "IN_REVIEW":
        return { text: "на проверке", color: "violet" };

      default:
        return { text: "в процессе", color: "yellow" };
    }
  };

  const rows = tasks.map((task, index) => (
    <Table.Tr key={index} className="text-[12px]">
      <Table.Td>{task.name}</Table.Td>
      <Table.Td>{new Date(task.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Badge color={translateStatus(task.status).color}>
          {translateStatus(task.status).text}
        </Badge>
      </Table.Td>
      <Table.Td>{task.executors.map((l) => l.login).join(", ")}</Table.Td>
      <Table.Td>
        {new Date(task.deadline.replace("Z", "")).toLocaleString()}
      </Table.Td>
    </Table.Tr>
  ));
  return <Table.Tbody>{rows}</Table.Tbody>;
};

export default TaskRows;
