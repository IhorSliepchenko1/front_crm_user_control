import type {
  Status,
  TProjectQuery,
} from "@/app/services/projects/projectsTypes";
import {
  useChangeStatusMutation,
  useLazyTaskByProjectIdQuery,
  useRemoveExecutorMutation,
} from "@/app/services/tasks/tasksApi";
import type { TaskItem } from "@/app/services/tasks/tasksTypes";
import { useChangePage } from "@/hooks/useChangePage";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { useTranslateStatus } from "@/hooks/useTranslateStatus";
import { errorMessages } from "@/utils/is-error-message";
import { Anchor, Badge, Button, Menu, Table, Text } from "@mantine/core";
import { Trash } from "lucide-react";

type Props = {
  tasks: TaskItem[];
  projectQuery: TProjectQuery;
};

const TaskRows: React.FC<Props> = ({ tasks, projectQuery }) => {
  const { changePage } = useChangePage();
  const { translateToRender, translateToChange } = useTranslateStatus();

  const paintExpiredDeadline = (dateTime: string, status: Status) => {
    const now = new Date();
    const deadline = new Date(dateTime);
    return deadline < now && status === "IN_PROGRESS";
  };

  const statuses = ["в процессе", "выполнено", "на проверке", "отменено"];
  const [updateStatus] = useChangeStatusMutation();
  const [removeExecutor] = useRemoveExecutorMutation();
  const [triggerTaskById] = useLazyTaskByProjectIdQuery();
  const { succeed, error } = useNotification();

  const onSubmit = async (statusStr: string, taskId: string) => {
    try {
      const status = translateToChange(statusStr) as Status;
      const { message } = await updateStatus({ taskId, status }).unwrap();
      await triggerTaskById(projectQuery).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    }
  };

  const onSubmitRemove = async (executorId: string, taskId: string) => {
    try {
      const { message } = await removeExecutor({ executorId, taskId }).unwrap();

      await triggerTaskById(projectQuery).unwrap();
      succeed(message);
    } catch (err) {
      console.log(executorId, taskId);
      error(errorMessages(err));
    }
  };

  const rows = tasks.map((task, index) => (
    <Table.Tr key={index} className="text-[12px]">
      <Table.Td>
        <Anchor onClick={() => changePage(task.id, "/task")}>
          {task.name}
        </Anchor>
      </Table.Td>
      <Table.Td>{new Date(task.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Menu trigger="click-hover">
          <Menu.Target>
            <Badge color={translateToRender(task.status).color}>
              {translateToRender(task.status).text}
            </Badge>
          </Menu.Target>
          <Menu.Dropdown>
            {statuses.map(
              (status) =>
                status !== translateToRender(task.status).text && (
                  <Menu.Item onClick={() => onSubmit(status, task.id)}>
                    {status}
                  </Menu.Item>
                )
            )}
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
      <Table.Td>
        <Menu trigger="click-hover">
          <Menu.Target>
            <Text>
              <span className="text-[12px]">
                {task.executors.map((l) => l.login).join("; ")}
              </span>
            </Text>
          </Menu.Target>
          <Menu.Dropdown>
            {task.executors.map((executor, index) => (
              <Menu.Item key={index}>
                <Button
                  variant="light"
                  color="red"
                  size="xs"
                  radius="md"
                  w={"100%"}
                  onClick={() => onSubmitRemove(executor.id, task.id)}
                >
                  <span className="cursor-pointer flex items-center gap-1">
                    {executor.login} <Trash size={15} color="red" />
                  </span>
                </Button>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
      <Table.Td
        className={
          paintExpiredDeadline(task.deadline, task.status) ? "text-red-600" : ""
        }
      >
        {new Date(task.deadline).toLocaleString()}
      </Table.Td>
    </Table.Tr>
  ));
  return <Table.Tbody>{rows}</Table.Tbody>;
};

export default TaskRows;
