import {
  useLazyGetMeQuery,
  useLoginMutation,
} from "@/app/services/auth/authApi";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";

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

  const [login] = useLoginMutation();
  const [triggerMe] = useLazyGetMeQuery();
  const navigate = useNavigate();
  const { succeed, error } = useNotification();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { message } = await login(data).unwrap();
      await triggerMe().unwrap();
      form.reset();
      navigate("/");
      succeed(message);
    } catch (err) {
      form.reset();
      error(errorMessages(err));
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
    </div>
  );
};

export default Login;
