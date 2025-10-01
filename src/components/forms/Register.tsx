import { useRegisterMutation } from "@/app/services/auth/authApi";
import { useLazyGetUsersQuery } from "@/app/services/user/userApi";
import { errorMessages } from "@/utils/is-error-message";
import { Button, Divider, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useNotification } from "@/hooks/useNotification/useNotification";
import type { Pagination } from "@/types";
import type { Register as RegisterFormData } from "@/app/services/auth/authTypes";

// igor_admin_test
// igor_user_test
const Register: React.FC<Pagination> = ({ page, limit, active }) => {
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
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    } finally {
      form.reset();
    }
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)} className="grid gap-3">
      <TextInput
        {...form.getInputProps("login")}
        key={form.key("login")}
        label="Логин"
        placeholder="логин пользователя"
        required
      />
      <PasswordInput
        label="Пароль"
        placeholder="пароль пользователя"
        key={form.key("password")}
        {...form.getInputProps("password")}
        required
      />

      <TextInput
        {...form.getInputProps("adminCode")}
        label="Админ код"
        key={form.key("adminCode")}
        placeholder="код администратора"
      />
      <Button type="submit" variant="outline">
        Зарегистрировать
      </Button>
      <Divider my="md" />
    </form>
  );
};

export default Register;
