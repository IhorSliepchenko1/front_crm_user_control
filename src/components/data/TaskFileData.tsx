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
import { useDownloadFile } from "@/hooks/useDownloadFile";
import { Button, Menu } from "@mantine/core";
import type { TFile } from "@/app/services/tasks/tasksTypes";
import { useDisclosure } from "@mantine/hooks";
import DeleteTaskFileModal from "../modals/DeleteTaskFileModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { myInfo } from "@/app/features/authSlice";

type Props = {
  filePath: TFile[];
  taskId: string;
  creatorName: string;
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

const TaskFileData: React.FC<Props> = ({ filePath, taskId, creatorName }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const name = useSelector(myInfo).name;
  const { handleDownload } = useDownloadFile();
  const getFileType = (fileName: string) => {
    const type = mime.getType(fileName);
    const icon = mimeTypes.find((i) => type === i.type);
    const array = fileName.split(".");
    const name = array[array.length - 1];
    return { icon: icon?.icon ?? FaFile, name };
  };

  const [fileData, setFileData] = useState<{ fileId: string; type: string }>({
    fileId: "",
    type: "",
  });

  const fileDataUpdateInfo = (file: TFile) => {
    setFileData((prev) => ({ ...prev, fileId: file.id, type: file.type }));
    open();
  };

  return (
    <div>
      <div className="flex gap-10 mt-2">
        {filePath.map((item, index) => (
          <Menu trigger="hover">
            <Menu.Target>
              <div className="grid justify-center">
                <Icon icon={getFileType(item.fileName).icon} />
                <span>
                  {index + 1}.{getFileType(item.fileName).name}
                </span>
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>
                <Button
                  variant="light"
                  color="teal"
                  size="sm"
                  onClick={() => handleDownload(item.fileName)}
                >
                  скачать
                </Button>
              </Menu.Item>

              {name === creatorName && (
                <Menu.Item>
                  <Button
                    variant="light"
                    color="red"
                    size="sm"
                    onClick={() => fileDataUpdateInfo(item)}
                  >
                    удалить
                  </Button>
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        ))}
      </div>

      <DeleteTaskFileModal
        fileId={fileData.fileId}
        type={fileData.type as "filePathTask" | "filePathExecutor"}
        taskId={taskId}
        opened={opened}
        close={close}
      />
    </div>
  );
};

export default TaskFileData;
