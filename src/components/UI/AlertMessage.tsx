import { Alert } from "@mantine/core";
import { CircleAlert, CircleCheck, CircleX } from "lucide-react";

type Props = {
  message: string;
  isShow: boolean;
  type: "error" | "warning" | "success";
};

const AlertMessage: React.FC<Props> = ({ message, isShow, type }) => {
  const icon =
    type === "error" ? (
      <CircleX />
    ) : type === "success" ? (
      <CircleCheck />
    ) : (
      <CircleAlert />
    );

  const color =
    type === "error" ? "#dc4446" : type === "success" ? "#49aa19" : "#d89614";

  const title =
    type === "error" ? "Ошибка!" : type === "success" ? "Успех!" : "Внимание!";

  return (
    isShow && (
      <div className="py-2">
        <Alert variant="light" color={color} title={title} icon={icon} radius={7}>
          {message}
        </Alert>
      </div>
    )
  );
};

export default AlertMessage;
