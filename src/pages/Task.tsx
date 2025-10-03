import { useTaskByIdQuery } from "@/app/services/tasks/tasksApi";
import Loader from "@/components/UI/Loader";
import PageTitle from "@/components/UI/PageTitle";
import { Divider, Title, Typography } from "@mantine/core";
import { useParams } from "react-router-dom";
import type { TaskById, TFile } from "@/app/services/tasks/tasksTypes";
import TaskFileData from "@/components/data/TaskFileData";
import TaskMainInfo from "@/components/items/TaskMainInfo";

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
  const { data, isLoading } = useTaskByIdQuery(id as string);
  const task: TaskById = data?.data ?? defaultTask;
  const { name, taskDescription, files } = task;

  const { filePathTask } = files.reduce<TPathTask>(
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
          <TaskFileData title={"Файлы для работы:"} filePath={filePathTask} />
          <Divider my="md" />
          <div>
            <Title order={3}>Описание к задаче</Title>
            <div className="mt-2 p-8 bg-[#555555] max-h-[500px] overflow-y-auto">
              <Typography className="h-[100%]">
                <div
                  dangerouslySetInnerHTML={{ __html: taskDescription ?? "" }}
                />
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Task;
