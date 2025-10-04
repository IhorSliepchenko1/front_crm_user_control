import { useTaskByIdQuery } from "@/app/services/tasks/tasksApi";
import Loader from "@/components/UI/Loader";
import PageTitle from "@/components/UI/PageTitle";
import { Button, Divider, Title, Typography } from "@mantine/core";
import { useParams } from "react-router-dom";
import type { TaskById, TFile } from "@/app/services/tasks/tasksTypes";
import TaskFileData from "@/components/data/TaskFileData";
import TaskMainInfo from "@/components/items/TaskMainInfo";
import { useDisclosure } from "@mantine/hooks";
import UpdateExecutorTaskModal from "@/components/modals/UpdateExecutorTaskModal";
import TaskDescScrolContainer from "@/components/UI/TaskDescScrolContainer";

type TPathTask = {
  filePathTask: TFile[];
  filePathExecutor: TFile[];
};

const defaultTask: TaskById = {
  name: "",
  executors: [],
  deadline: "",
  status: "IN_PROGRESS",
  executorDescription: null,
  taskDescription: null,
  files: [
    {
      id: "",
      fileName: "example.csv",
      type: "filePathTask",
    },
    {
      id: "",
      fileName: "example.csv",
      type: "filePathExecutor",
    },
  ],
  project: {
    creatorId: "",
    creator: { login: "" },
  },
};

const Task = () => {
  const { id } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading } = useTaskByIdQuery(id as string);
  const task: TaskById = data?.data ?? defaultTask;
  const { name, taskDescription, files, executorDescription } = task;

  const { filePathTask, filePathExecutor } = files.reduce<TPathTask>(
    (acc, val) => {
      if (val.type === "filePathExecutor") {
        acc.filePathExecutor.push(val);
      } else {
        acc.filePathTask.push(val);
      }

      return acc;
    },
    {
      filePathTask: [],
      filePathExecutor: [],
    }
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PageTitle title="Информация о задаче " cursive={name} />
          <TaskMainInfo data={data?.data} defaultTask={defaultTask} />
          <Divider my="md" />
          <div className="grid gap-7">
            <div className="grid gap-5">
              <Title order={3}>Описание к задаче</Title>
              <div>
                <TaskFileData
                  title={"Файлы для работы:"}
                  filePath={filePathTask}
                />
                <TaskDescScrolContainer>
                  <Typography className="h-[100%]">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: taskDescription ?? "",
                      }}
                    />
                  </Typography>
                </TaskDescScrolContainer>
              </div>
            </div>

            <Divider my="md" />

            <div className="grid gap-5">
              <Title order={3}>Описание к выполнению</Title>
              <div>
                <TaskFileData
                  title={"Файлы выполнения задачи:"}
                  filePath={filePathExecutor}
                />
                <TaskDescScrolContainer>
                  <Typography className="h-[100%]">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: executorDescription ?? "",
                      }}
                    />
                  </Typography>
                </TaskDescScrolContainer>
              </div>
            </div>
          </div>
          <UpdateExecutorTaskModal
            opened={opened}
            close={close}
            taskId={id as string}
            executorDescription={executorDescription ?? ""}
          />
          <Button
            fullWidth
            className="mt-10"
            onClick={open}
            disabled={task.status !== "IN_PROGRESS"}
          >
            Отпправить решение
          </Button>
        </div>
      )}
    </>
  );
};

export default Task;
