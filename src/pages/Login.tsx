import {
  useLazyGetMeQuery,
  useLoginMutation,
} from "@/app/services/auth/authApi";
import { isErrorMessage } from "@/utils/is-error-message";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import AlertMessage from "@/components/UI/AlertMessage";

type LoginFormData = {
  login: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const form = useForm<LoginFormData>({
    mode: "uncontrolled",
    initialValues: {
      login: "",
      password: "",
      remember: true,
    },
    validate: {
      login: hasLength({ min: 3 }, "Логин должен быть минимум 3 символа"),
      password: hasLength({ min: 6 }, "Пароль должен быть минимум 6 символов"),
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [login] = useLoginMutation();
  const [triggerMe] = useLazyGetMeQuery();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      await triggerMe().unwrap();
      form.reset();
      navigate("/");
    } catch (error) {
      const message = isErrorMessage(error);
      setErrorMessage(message);
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)} className="p-7">
        <TextInput
          {...form.getInputProps("login")}
          key={form.key("login")}
          label="Логин"
          placeholder="введите ваш логин"
          required
        />
        <PasswordInput
          label="Пароль"
          placeholder="введить ваш пароль"
          key={form.key("password")}
          {...form.getInputProps("password")}
          required
        />

        <Checkbox
          mt="md"
          label="Запомнить меня?"
          key={form.key("remember")}
          {...form.getInputProps("remember", { type: "checkbox" })}
        />

        <Button type="submit" mt="md">
          Войти
        </Button>
      </form>
      <div className="absolute bottom-0 w-[100%] p-3">
        <AlertMessage
          isShow={Boolean(errorMessage)}
          message={errorMessage}
          type="error"
        />
      </div>
    </div>
  );
};

export default Login;
