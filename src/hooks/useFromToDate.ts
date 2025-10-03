import type { CalendarValue } from "@/app/services/tasks/tasksTypes";
import { useMemo } from "react";

export const useFromToDate = (value: CalendarValue) => {
  const fromToDate = useMemo(() => {
    if (value[0] !== null) {
      const [start, end] = value;

      const deadlineFrom = start ? `${start}T00:00:00.000Z` : undefined;
      const to = `${end}T23:59:59.000Z`;
      const deadlineTo = end ? to : !end && start ? deadlineFrom : undefined;

      return { deadlineFrom, deadlineTo };
    }

    return { deadlineFrom: undefined, deadlineTo: undefined };
  }, [value]);

  const { deadlineFrom, deadlineTo } = fromToDate;

  return { deadlineFrom, deadlineTo };
};
