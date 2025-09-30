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

type Props = {
  projectId: string;
  participants: {
    id: string;
    login: string;
  }[];
};
const RemoveParticipants: React.FC<Props> = ({ projectId, participants = [] }) => {
  const form = useForm({
    mode: "uncontrolled",
  });

  const [changeParticipants] = useChangeParticipantsProjectMutation();
  const [triggerProject] = useLazyProjectByIdQuery();
  const { succeed, error } = useNotification();

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
      form.reset();
      setToRemove([]);
      succeed(message);
    } catch (err) {
      form.reset();
      setToRemove([]);
      error(errorMessages(err));
    }
  };

  return participants.length ? (
    <form onSubmit={form.onSubmit(onSubmit)} className="grid gap-5 mt-5">
      <div className="grid max-h-[250px] xl:max-h-none overflow-y-auto xl:overflow-y-hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
        size="md"
        variant="outline"
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
