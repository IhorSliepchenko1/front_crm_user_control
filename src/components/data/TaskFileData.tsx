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
import { Tooltip } from "@mantine/core";
import type { TFile } from "@/app/services/tasks/tasksTypes";

type Props = {
  title: string;
  filePath: TFile[];
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

const TaskFileData: React.FC<Props> = ({ title, filePath }) => {
  const { handleDownload } = useDownloadFile();
  const getFileType = (fileName: string) => {
    const type = mime.getType(fileName);
    const icon = mimeTypes.find((i) => type === i.type);
    const array = fileName.split(".");
    const name = array[array.length - 1];
    return { icon: icon?.icon ?? FaFile, name };
  };
  return (
    <div>
      <p>{title}</p>
      <div className="flex gap-10 mt-2">
        {filePath.map((item, index) => (
          <Tooltip label="скачать" position="bottom" key={index}>
            <button
              className="text-center cursor-pointer"
              onClick={() => handleDownload(item.fileName)}
            >
              <Icon icon={getFileType(item.fileName).icon} />
              <span>
                {index + 1}.{getFileType(item.fileName).name}
              </span>
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default TaskFileData;
