import {
  useChangeParticipantsProjectMutation,
  useLazyProjectByIdQuery,
} from "@/app/services/projects/projectsApi";
import type { User } from "@/app/services/user/userTypes";
import { useExtractId } from "@/hooks/useExtractId";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Button, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

type AddParticipantsFormData = {
  participants: string[];
};

type Props = {
  projectId: string;
  users: User[];
};

const AddParticipants: React.FC<Props> = ({ projectId, users = [] }) => {
  const form = useForm<AddParticipantsFormData>({
    mode: "uncontrolled",
    initialValues: {
      participants: [],
    },
    validate: {
      participants: (value) =>
        value.length < 1 && value.length > 15
          ? "К-во участников должно быть в пределах от 1 - 15"
          : null,
    },
  });

  const [changeParticipants] = useChangeParticipantsProjectMutation();
  const [triggerProject] = useLazyProjectByIdQuery();
  const { succeed, error } = useNotification();

  const arrayUserName = users.map((u) => u.login);
  const [value, setValue] = useState<string[]>([]);

  const { extract } = useExtractId("login", "id");

  const onSubmit = async () => {
    try {
      const ids = extract({
        str: value,
        obj: users,
      });

      const { message } = await changeParticipants({
        id: projectId,
        ids,
        key: "connect",
      }).unwrap();
      await triggerProject(projectId).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    } finally {
      form.reset();
      setValue([]);
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)} className="grid gap-3">
        <MultiSelect
          {...form.getInputProps("participants")}
          key={form.key("participants")}
          label="Добавить участников"
          placeholder="список участников"
          data={arrayUserName}
          onChange={(val) => {
            setValue(val);
          }}
          searchable
          required
        />

        <Button
          type="submit"
          variant="outline"
          color="green"
          disabled={value.length === 0}
        >
          Добавить
        </Button>
      </form>
    </div>
  );
};

export default AddParticipants;
