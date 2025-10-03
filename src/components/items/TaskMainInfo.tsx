import type { TaskById } from "@/app/services/tasks/tasksTypes";
import { useTranslateStatus } from "@/hooks/useTranslateStatus";
import { Badge } from "@mantine/core";
import type React from "react";

type Props = {
  data: TaskById | undefined;
  defaultTask: TaskById;
};

const TaskMainInfo: React.FC<Props> = ({ data, defaultTask }) => {
  const task: TaskById = data ?? defaultTask;
  const { deadline, status, executors, project } = task;

  const now = new Date().toLocaleString();
  const deadlineDate = new Date(deadline).toLocaleString();
  const { translateToRender } = useTranslateStatus();
  return (
    <div className="mt-5 flex justify-between">
      <div className="flex flex-col gap-3 w-[500px]">
        <div className="flex justify-between items-center">
          <span>Статус:</span>
          <Badge color={translateToRender(status).color}>
            {translateToRender(status).text}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span>Срок сдачи:</span>
          <strong
            className={
              deadlineDate < now && status === "IN_PROGRESS"
                ? "text-red-600"
                : ""
            }
          >
            {deadlineDate}
          </strong>
        </div>
        <div className="flex justify-between items-center">
          <span>Куратор:</span>
          <strong className="text-[13px]">{project.creator.login}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span>Участники:</span>
          <strong className="text-[13px]">
            {executors.map((e) => e.login).join(", ")}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default TaskMainInfo;
