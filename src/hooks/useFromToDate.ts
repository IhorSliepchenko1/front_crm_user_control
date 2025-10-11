import type { CalendarValue } from "@/app/services/tasks/tasksTypes";
import { useMemo } from "react";

export const useFromToDate = (value: CalendarValue) => {
  const fromToDate = useMemo(() => {
    if (value[0] !== null) {
      const [start, end] = value;

      const deadlineFrom = start
        ? new Date(`${start}T00:00:00`).toISOString()
        : undefined;
      const to = end;
      const deadlineTo = end
        ? new Date(`${to}T23:59:59`).toISOString()
        : !end && start
        ? deadlineFrom
        : undefined;

      return { deadlineFrom, deadlineTo };
    }

    return { deadlineFrom: undefined, deadlineTo: undefined };
  }, [value]);

  const { deadlineFrom, deadlineTo } = fromToDate;

  return { deadlineFrom, deadlineTo };
};
