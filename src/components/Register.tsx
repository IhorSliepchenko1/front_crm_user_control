import { useRegisterMutation } from "@/app/services/auth/authApi";
import { useLazyGetUsersQuery } from "@/app/services/user/userApi";
import type { GetUsersQuery } from "@/app/services/user/userTypes";
import { isErrorMessage } from "@/utils/is-error-message";
import { Button, Divider, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useState } from "react";
import AlertMessage from "./UI/AlertMessage";

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

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [register] = useRegisterMutation();
  const [triggerUsers] = useLazyGetUsersQuery();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data).unwrap();
      await triggerUsers({ page, limit, active }).unwrap();
      form.reset();
    } catch (error) {
      const message = isErrorMessage(error);
      setErrorMessage(message);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          {...form.getInputProps("login")}
          key={form.key("login")}
          label="Логин"
          placeholder="логин пользователя"
          required
          size="xs"
        />
        <PasswordInput
          label="Пароль"
          placeholder="пароль пользователя"
          key={form.key("password")}
          {...form.getInputProps("password")}
          required
          size="xs"
        />

        <TextInput
          {...form.getInputProps("adminCode")}
          label="Админ код"
          key={form.key("adminCode")}
          placeholder="код администратора"
          size="xs"
        />

        <div className="mt-2 grid">
          <Button type="submit" size="xs" variant="outline">
            Зарегистрировать
          </Button>
        </div>
      </form>
      <AlertMessage
        isShow={Boolean(errorMessage)}
        message={errorMessage}
        type="error"
      />

      <Divider my="md" />
    </>
  );
};

export default Register;
