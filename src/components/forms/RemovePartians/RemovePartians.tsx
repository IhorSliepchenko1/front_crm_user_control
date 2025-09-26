import {
  useChangeParticipantsProjectMutation,
  useLazyProjectByIdQuery,
} from "@/app/services/projects/projectsApi";
import style from "./RemovePartians.module.scss";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { useForm } from "@mantine/form";
import { Button, Checkbox } from "@mantine/core";
import { useState } from "react";

type Props = {
  projectId: string;
  partiants: {
    id: string;
    login: string;
  }[];
};
const RemovePartians: React.FC<Props> = ({ projectId, partiants }) => {
  const form = useForm({
    mode: "uncontrolled",
  });

  const [changeParticipants] = useChangeParticipantsProjectMutation();
  const [triggerProject] = useLazyProjectByIdQuery();
  const { succeed, error } = useNotification();

  const [ids, setIds] = useState<Array<string>>([]);

  const setArray = (id: string, isAdd: boolean) => {
    if (!isAdd) {
      setIds((prev) => [...prev, id]);
    } else {
      const newArray = ids.filter((i) => i !== id);
      setIds(newArray);
    }
  };

  const onSubmit = async () => {
    try {
      const { message } = await changeParticipants({
        id: projectId,
        ids,
        key: "disconnect",
      }).unwrap();
      await triggerProject(projectId).unwrap();
      form.reset();
      setIds([]);
      succeed(message);
    } catch (err) {
      form.reset();
      error(errorMessages(err));
    }
  };

  return (
    partiants && (
      <form onSubmit={form.onSubmit(onSubmit)} className="grid gap-5 mt-5">
        <div className="grid grid-cols-3 gap-3">
          {partiants.map((member) => (
            <Checkbox
              key={member.id}
              classNames={style}
              label={member.login}
              defaultChecked
              onChange={(event) => {
                setArray(member.id, event.currentTarget.checked);
              }}
            />
          ))}
        </div>

        <Button
          type="submit"
          size="md"
          variant="outline"
          disabled={ids.length < 1}
        >
          Удалить из проекта
        </Button>
      </form>
    )
  );
};

export default RemovePartians;
