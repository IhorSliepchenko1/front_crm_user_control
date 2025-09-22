import { useLazyGetMeQuery } from "@/app/services/auth/authApi";
import {
  useLazyUserByIdQuery,
  useUpdateUserByIdMutation,
} from "@/app/services/user/userApi";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import {
  Button,
  FileInput,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type UpdateUserFormData = {
  oldPassword?: string;
  newPassword?: string;
  login?: string;
  files?: Array<File>;
};

type Props = {
  id: string;
  name: string;
};

const UserUpdateForm: React.FC<Props> = ({ id, name }) => {
  const form = useForm<UpdateUserFormData>({
    mode: "uncontrolled",
    validate: {
      login: (value) =>
        value && value.length < 3
          ? "Минимальная длинна логина 3 символов!"
          : value === name
          ? "Новый логин должен отличаться от текущего"
          : null,

      oldPassword: (value) =>
        value && value.length < 6
          ? "Минимальная длинна пароля 6 символов!"
          : null,

      newPassword: (value) =>
        value && value.length < 6
          ? "Минимальная длинна пароля 6 символов!"
          : null,
    },
  });

  const [userUpdate] = useUpdateUserByIdMutation();
  const [triggerUser] = useLazyUserByIdQuery();
  const [triggerMe] = useLazyGetMeQuery();
  const { succeed, error } = useNotification();

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      const { login, newPassword, oldPassword, files } = data;
      const formData = new FormData();

      if (login) formData.append("login", login);
      if (newPassword) formData.append("newPassword", newPassword);
      if (oldPassword) formData.append("oldPassword", oldPassword);

      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const { message } = await userUpdate({ id, formData }).unwrap();
      await triggerUser(id).unwrap();
      await triggerMe().unwrap();
      form.reset();
      succeed(message);
    } catch (err) {
      form.reset();
      error(errorMessages(err));
    }
  };
  return (
    <div className="grid w-[100%]">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Title order={4}>Редактировать пользователя</Title>
        <div className="grid gap-5 mt-2">
          <TextInput
            {...form.getInputProps("login")}
            key={form.key("login")}
            label="Логин"
            placeholder="логин"
            size="md"
          />
          <PasswordInput
            {...form.getInputProps("oldPassword")}
            key={form.key("oldPassword")}
            label="Текущий пароль"
            placeholder="пароль"
            size="md"
          />

          <PasswordInput
            {...form.getInputProps("newPassword")}
            key={form.key("newPassword")}
            label="Новый пароль"
            placeholder="пароль"
            size="md"
          />
          <FileInput
            label="Аватар"
            placeholder="загрузите файл"
            key={form.key("files")}
            {...form.getInputProps("files")}
            multiple
            onChange={(file) => {
              form.setFieldValue("files", file);
            }}
          />
        </div>
        <div className="mt-7 grid">
          <Button type="submit" size="md" variant="outline">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;
