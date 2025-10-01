import type { Status } from "@/app/services/projects/projectsTypes";

export const useTranslateStatus = () => {
  const translateToChange = (value: string): Status | undefined => {
    switch (value) {
      case "все":
        return undefined;

      case "в процессе":
        return "IN_PROGRESS";

      case "выполнено":
        return "DONE";

      case "на проверке":
        return "IN_REVIEW";

      case "отменено":
        return "CANCELED";

      default:
        return undefined;
    }
  };

  const translateToRender = (status: Status) => {
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

  return { translateToChange, translateToRender };
};
