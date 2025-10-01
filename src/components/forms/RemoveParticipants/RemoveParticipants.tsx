import {
  useChangeParticipantsProjectMutation,
  useLazyProjectByIdQuery,
} from "@/app/services/projects/projectsApi";
import style from "./RemoveParticipants.module.scss";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { useForm } from "@mantine/form";
import { Button, Checkbox } from "@mantine/core";
import { useState } from "react";
import type { User } from "@/app/services/user/userTypes";
import { useLazyTaskByProjectIdQuery } from "@/app/services/tasks/tasksApi";
import type { TProjectQuery } from "@/app/services/projects/projectsTypes";

type Props = {
  projectId: string;
  participants: User[];
  projectQuery: TProjectQuery;
};
const RemoveParticipants: React.FC<Props> = ({
  projectId,
  participants = [],
  projectQuery,
}) => {
  const form = useForm({
    mode: "uncontrolled",
  });

  const [changeParticipants] = useChangeParticipantsProjectMutation();
  const [triggerProject] = useLazyProjectByIdQuery();
  const { succeed, error } = useNotification();
  const [triggerTasks] = useLazyTaskByProjectIdQuery();

  const [toRemove, setToRemove] = useState<string[]>([]);

  const markForRemove = (id: string, keep: boolean) => {
    if (!keep) {
      setToRemove((prev) => [...prev, id]);
    } else {
      setToRemove((prev) => prev.filter((i) => i !== id));
    }
  };

  const onSubmit = async () => {
    try {
      const { message } = await changeParticipants({
        id: projectId,
        ids: toRemove,
        key: "disconnect",
      }).unwrap();
      await triggerProject(projectId).unwrap();
      await triggerTasks(projectQuery).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    } finally {
      form.reset();
      setToRemove([]);
    }
  };

  return participants.length ? (
    <form onSubmit={form.onSubmit(onSubmit)} className="grid gap-5 mt-5">
      <div
        className={`grid max-h-[250px] overflow-y-auto grid-cols-1 gap-3
        xl:max-h-none
        xl:overflow-y-hidden
        md:grid-cols-2
        lg:grid-cols-3`}
      >
        {participants.map((member) => (
          <Checkbox
            key={member.id}
            classNames={style}
            label={member.login}
            defaultChecked
            onChange={(event) =>
              markForRemove(member.id, event.currentTarget.checked)
            }
          />
        ))}
      </div>

      <Button
        type="submit"
        size="sm"
        variant="outline"
        color="red"
        disabled={toRemove.length === 0}
      >
        Удалить из проекта
      </Button>
    </form>
  ) : (
    <p>данные не обнаружены</p>
  );
};

export default RemoveParticipants;
