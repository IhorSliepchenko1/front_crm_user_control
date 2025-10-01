import {
  useLazyProjectByIdQuery,
  useRenameProjectMutation,
} from "@/app/services/projects/projectsApi";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type RenameProjectFormData = {
  name: string;
};

type Props = {
  projectId: string;
};

const RenameProject: React.FC<Props> = ({ projectId }) => {
  const form = useForm<RenameProjectFormData>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        value.length < 5 && value.length > 50
          ? "К-во символов должно быть в пределах 1 - 50"
          : null,
    },
  });

  const [renameProject] = useRenameProjectMutation();
  const [triggerProject] = useLazyProjectByIdQuery();
  const { succeed, error } = useNotification();

  const onSubmit = async (data: RenameProjectFormData) => {
    try {
      const { message } = await renameProject({
        ...data,
        id: projectId,
      }).unwrap();
      await triggerProject(projectId).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    } finally {
      form.reset();
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)} className="grid gap-3">
        <TextInput
          {...form.getInputProps("name")}
          label="Переименовать проект"
          key={form.key("name")}
          placeholder="название проекта"
          required
        />

        <Button
          type="submit"
          variant="outline"
          color="teal"
          disabled={!form.isDirty()}
        >
          Переименовать
        </Button>
      </form>
    </div>
  );
};

export default RenameProject;
