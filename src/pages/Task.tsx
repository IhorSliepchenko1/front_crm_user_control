import { useTaskByIdQuery } from "@/app/services/tasks/tasksApi";
import Loader from "@/components/UI/Loader";
import PageTitle from "@/components/UI/PageTitle";
import { Badge, Divider, Title, Tooltip, Typography } from "@mantine/core";
import { useParams } from "react-router-dom";
import type { TaskById, TFile } from "@/app/services/tasks/tasksTypes";
import { useTranslateStatus } from "@/hooks/useTranslateStatus";
import mime from "mime";
import {
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaFileImage,
  FaFile,
} from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { FaFileWord } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { BiSolidFilePng } from "react-icons/bi";
import type { IconType } from "react-icons/lib";
import Icon from "@/components/UI/Icon";

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

const mimeTypes: { type: string; icon: IconType }[] = [
  { type: "text/csv", icon: FaFileCsv },
  { type: "application/vnd.ms-excel", icon: FaFileExcel },
  {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    icon: FaFileExcel,
  },
  { type: "application/pdf", icon: FaFilePdf },
  { type: "text/plain", icon: IoDocumentText },
  { type: "application/msword", icon: FaFileWord },
  {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    icon: IoIosDocument,
  },
  { type: "image/png", icon: BiSolidFilePng },
  { type: "image/jpeg", icon: FaFileImage },
];

const Task = () => {
  const { id } = useParams();
  const { data, isLoading } = useTaskByIdQuery(id as string);
  const task: TaskById = data?.data ?? defaultTask;
  const { deadline, status, name, executors, taskDescription, files } = task;
  const now = new Date().toLocaleString();
  const deadlineDate = new Date(deadline).toLocaleString();
  const { translateToRender } = useTranslateStatus();

  const { filePathTask } = files.reduce<{
    filePathTask: TFile[];
    filePathExecutor: TFile[];
  }>(
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

  const getFileType = (fileName: string) => {
    const type = mime.getType(fileName);
    const icon = mimeTypes.find((i) => type === i.type);
    const array = fileName.split(".");
    const name = array[array.length - 1];
    return { icon: icon?.icon ?? FaFile, name };
  };
  const url = import.meta.env.VITE_API_URL;

  const handleDownload = async (fileName: string) => {
    try {
      const response = await fetch(`${url}/${fileName}`);
      console.log(response);

      const blob = await response.blob();
      console.log(blob);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PageTitle title="Информация о задаче " cursive={name} />

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
                <strong className={deadlineDate < now ? "text-red-600" : ""}>
                  {deadlineDate}
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span>Участники:</span>
                <strong className="text-[13px]">
                  {executors.map((e) => e.login).join(", ")}
                </strong>
              </div>
              <div className="mt-7">
                <p>Файлы для работы:</p>
                <div className="flex gap-10 mt-2">
                  {filePathTask.map((item, index) => (
                    <Tooltip label="скачать" position="bottom" key={index}>
                      <button
                        className="text-center cursor-pointer"
                        onClick={() => handleDownload(item.fileName)}
                      >
                        <Icon icon={getFileType(item.fileName).icon} />
                        <span>.{getFileType(item.fileName).name}</span>
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
