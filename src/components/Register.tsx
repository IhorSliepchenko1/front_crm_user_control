import { useRegisterMutation } from "@/app/services/auth/authApi";
import { useLazyGetUsersQuery } from "@/app/services/user/userApi";
import type { GetUsersQuery } from "@/app/services/user/userTypes";
import { errorMessages } from "@/utils/is-error-message";
import { Button, Divider, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useNotification } from "@/hooks/useNotification/useNotification";

type RegisterFormData = {
  login: string;
  password: string;
  adminCode?: string;
};

const Register: React.FC<GetUsersQuery> = ({ page, limit, active }) => {
  const form = useForm<RegisterFormData>({
    mode: "uncontrolled",
    initialValues: {
      login: "",
      password: "",
      adminCode: "",
    },
    validate: {
      login: hasLength({ min: 3 }, "Логин должен быть минимум 3 символа"),
      password: hasLength({ min: 6 }, "Пароль должен быть минимум 6 символов"),
    },
  });

  const [register] = useRegisterMutation();
  const [triggerUsers] = useLazyGetUsersQuery();
  const { succeed, error } = useNotification();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { message } = await register(data).unwrap();
      await triggerUsers({ page, limit, active }).unwrap();
      form.reset();
      succeed(message);
    } catch (err) {
      form.reset();
      error(errorMessages(err));
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className="grid gap-3">
          <TextInput
            {...form.getInputProps("login")}
            key={form.key("login")}
            label="Логин"
            placeholder="логин пользователя"
            required
            size="md"
          />
          <PasswordInput
            label="Пароль"
            placeholder="пароль пользователя"
            key={form.key("password")}
            {...form.getInputProps("password")}
            required
            size="md"
          />

          <TextInput
            {...form.getInputProps("adminCode")}
            label="Админ код"
            key={form.key("adminCode")}
            placeholder="код администратора"
            size="md"
          />
        </div>

        <div className="mt-5 grid">
          <Button type="submit" size="md" variant="outline">
            Зарегистрировать
          </Button>
        </div>
      </form>
      <Divider my="md" />
    </>
  );
};

export default Register;
