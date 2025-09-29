import {
  useAddProjectMutation,
  useLazyProjectAllQuery,
} from "@/app/services/projects/projectsApi";
import { useGetUsersProjectQuery } from "@/app/services/user/userApi";
import Loader from "@/components/UI/Loader";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Button, Divider, MultiSelect, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useState } from "react";

type AddProjectFormData = {
  name: string;
  participants: Array<string>;
};

type Props = {
  page: number;
  limit: number;
  active: boolean;
};

const AddProject: React.FC<Props> = ({ page, limit, active }) => {
  const [value, setValue] = useState<string[]>([]);

  const form = useForm<AddProjectFormData>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      participants: [],
    },
    validate: {
      name: hasLength(
        { min: 5, max: 50 },
        "Название проекта должно быть минимум 5 символа"
      ),
      participants: () =>
        value.length < 1 || value.length > 15
          ? "К-во участников должно быть в пределах от 1 - 15"
          : null,
    },
  });

  const { data: users, isLoading: usersLoading } = useGetUsersProjectQuery();
  const [addProject] = useAddProjectMutation();
  const [triggerProjects] = useLazyProjectAllQuery();

  const arrayUserName = users?.data?.map((u) => u.login);
  const { succeed, error } = useNotification();

  const onSubmit = async (data: AddProjectFormData) => {
    try {
      const participants = value.map((n) => {
        const userData = users?.data?.find((u) => {
          if (u.login === n) return u;
        });

        return userData?.id;
      }) as string[];

      const { message } = await addProject({ ...data, participants }).unwrap();
      await triggerProjects({ page, limit, active }).unwrap();
      form.reset();
      setValue([]);
      succeed(message);
    } catch (err) {
      form.reset();
      setValue([]);
      error(errorMessages(err));
    }
  };

  return (
    <>
      {usersLoading ? (
        <Loader />
      ) : (
        <form onSubmit={form.onSubmit(onSubmit)} className="grid gap-3">
          <TextInput
            {...form.getInputProps("name")}
            key={form.key("name")}
            label="Название проекта"
            placeholder="название"
            required
          />

          <MultiSelect
            {...form.getInputProps("participants")}
            key={form.key("participants")}
            label="Участники проекта"
            placeholder="список участников"
            data={arrayUserName}
            onChange={(val) => {
              setValue(val);
            }}
            searchable
            required
          />

          <Button type="submit" variant="outline" color="green">
            Добавить проект
          </Button>
          <Divider my="md" />
        </form>
      )}
    </>
  );
};

export default AddProject;
