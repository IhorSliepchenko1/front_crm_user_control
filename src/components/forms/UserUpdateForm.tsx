import { useLazyGetMeQuery } from "@/app/services/auth/authApi";
import {
  useLazyUserByIdQuery,
  useUpdateUserByIdMutation,
} from "@/app/services/user/userApi";
import type { UpdateUser } from "@/app/services/user/userTypes";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Button, FileInput, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  id: string;
  name: string;
};

const UserUpdateForm: React.FC<Props> = ({ id, name }) => {
  const form = useForm<UpdateUser>({
    mode: "uncontrolled",
    initialValues: {
      login: "",
      oldPassword: "",
      newPassword: "",
      files: [],
    },
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

      files: (value) =>
        value && value.some((f) => f.size > 1 * 1024 * 1024)
          ? "Максимальный размер файла 1МБ!"
          : null,
    },
  });

  const [userUpdate] = useUpdateUserByIdMutation();
  const [triggerUser] = useLazyUserByIdQuery();
  const [triggerMe] = useLazyGetMeQuery();
  const { succeed, error } = useNotification();

  const onSubmit = async (data: UpdateUser) => {
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
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    } finally {
      form.reset();
    }
  };

  return (
    <div className="grid w-[100%]">
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className="grid gap-5 mt-2">
          <TextInput
            {...form.getInputProps("login")}
            key={form.key("login")}
            label="Новый логин"
            placeholder="логин"
          />
          <FileInput
            label="Сменить аватар"
            size='sm'
            placeholder="загрузите файл"
            key={form.key("files")}
            {...form.getInputProps("files")}
            multiple
            onChange={(file) => {
              form.setFieldValue("files", file);
            }}
          />
          <PasswordInput
            {...form.getInputProps("oldPassword")}
            key={form.key("oldPassword")}
            label="Текущий пароль"
            placeholder="пароль"
          />

          <PasswordInput
            {...form.getInputProps("newPassword")}
            key={form.key("newPassword")}
            label="Новый пароль"
            placeholder="пароль"
          />
        </div>
        <div className="mt-7 grid">
          <Button type="submit" variant="outline" disabled={!form.isDirty()}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;
