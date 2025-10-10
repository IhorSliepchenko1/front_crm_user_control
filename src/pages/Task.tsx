import { useLazyTaskByIdQuery, useTaskByIdQuery } from "@/app/services/tasks/tasksApi";
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
import { useAppSelector } from "@/app/hooks";
import { isAdminRole, myInfo } from "@/app/features/authSlice";
import UpdateCreatorTaskModal from "@/components/modals/UpdateCreatorTaskModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socketType } from "@/app/features/socketTypeSlice";

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
  participants: [
    {
      id: "",
      login: "",
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
  const [triggerTaskById] = useLazyTaskByIdQuery();
  const [modal, setModal] = useState<"executor" | "creator">();

  const task: TaskById = data?.data ?? defaultTask;
  const {
    name,
    taskDescription,
    files,
    executorDescription,
    deadline,
    participants,
  } = task;
  const currentName = useAppSelector(myInfo).name;
  const changeModal = (type: "executor" | "creator") => {
    setModal(type);
    open();
  };

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

  const isAdmin = useSelector(isAdminRole);

  const { taskId } = useSelector(socketType);

  useEffect(() => {
    if (taskId && taskId === id) {
      triggerTaskById(taskId);
    }
  }, [taskId]);

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
                  filePath={filePathTask}
                  taskId={id as string}
                  creatorName={task.project.creator.login}
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
                {(currentName == task.project.creator.login || isAdmin) && (
                  <Button
                    color="red"
                    fullWidth
                    className="mt-5"
                    onClick={() => changeModal("creator")}
                  >
                    Редактировать
                  </Button>
                )}
              </div>
            </div>

            <Divider my="md" />

            <div className="grid gap-5">
              <Title order={3}>Описание к выполнению</Title>
              <div>
                <TaskFileData
                  filePath={filePathExecutor}
                  taskId={id as string}
                  creatorName={task.project.creator.login}
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
          {modal === "executor" ? (
            <UpdateExecutorTaskModal
              opened={opened}
              close={close}
              taskId={id as string}
              executorDescription={executorDescription ?? ""}
            />
          ) : (
            <UpdateCreatorTaskModal
              opened={opened}
              close={close}
              taskId={id as string}
              name={name}
              deadline={deadline}
              taskDescription={taskDescription ?? ""}
              participants={participants}
            />
          )}

          <Button
            fullWidth
            className="mt-5"
            onClick={() => changeModal("executor")}
            disabled={task.status !== "IN_PROGRESS"}
          >
            Отправить решение
          </Button>
        </div>
      )}
    </>
  );
};

export default Task;
