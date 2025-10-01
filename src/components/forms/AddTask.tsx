import { useNotification } from "@/hooks/useNotification/useNotification";
import { useForm } from "@mantine/form";
import { errorMessages } from "@/utils/is-error-message";
import {
  useAddTaskMutation,
  useLazyTaskByProjectIdQuery,
} from "@/app/services/tasks/tasksApi";
import {
  Button,
  FileInput,
  MultiSelect,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";
import type { User } from "@/app/services/user/userTypes";
import type { Status } from "@/app/services/projects/projectsTypes";

type CreateTaskFormData = {
  name: string;
  deadline: string;
  taskDescription?: string;
  executors: Array<string>;
  files?: Array<File>;
};

export type TProjectQuery = {
  page: number;
  limit: number;
  projectId: string;
  status: Status | undefined;
  deadlineFrom: string | undefined;
  deadlineTo: string | undefined;
};

type Props = {
  participants: Array<User>;
  projectQuery: TProjectQuery;
  close: () => void;
};

const AddTask: React.FC<Props> = ({ projectQuery, participants, close }) => {
  const validateDeadline = (date: string) => {
    const now = new Date();
    const deadline = new Date(date);
    return now > deadline;
  };

  const form = useForm<CreateTaskFormData>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      deadline: "",
      taskDescription: "",
      executors: [],
      files: [],
    },
    validate: {
      name: (value) =>
        value && (value.length > 30 || value.length < 5)
          ? "Длина символов должна быть в диапазоне 5-30!"
          : null,

      deadline: (value) =>
        value && validateDeadline(value)
          ? "Дата сдачи результатов может быть только больше текущей!"
          : null,

      taskDescription: (value) =>
        value && value.length > 2_500
          ? "Длина описания задачи не может превышать 2500 символов!"
          : null,

      files: (value) =>
        value && value.some((f) => f.size > 5 * 1024 * 1024)
          ? "Максимальный размер файла 5МБ!"
          : value && value?.length > 5
          ? "Максимальное к-во файлов 5шт!"
          : null,
    },
  });
  const { succeed, error } = useNotification();
  const [addTask] = useAddTaskMutation();
  const [triggerTasks] = useLazyTaskByProjectIdQuery();
  const arrayUserName = participants.map((p) => p.login);
  const [value, setValue] = useState<string[]>([]);

  const onSubmit = async (data: CreateTaskFormData) => {
    try {
      const { name, deadline, taskDescription, files } = data;
      const formData = new FormData();

      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }

      const executors = value.map((n) => {
        const userData = participants.find((u) => {
          if (u.login === n) return u;
        });

        return userData?.id;
      }) as string[];

      const { message } = await addTask({
        projectId: projectQuery.projectId,
        name,
        deadline: `${deadline.split(" ").join("T")}Z`,
        executors,
        taskDescription,
      }).unwrap();
      await triggerTasks(projectQuery).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    } finally {
      form.reset();
      close();
    }
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <div className="grid gap-5 mt-2">
        <TextInput
          {...form.getInputProps("name")}
          key={form.key("name")}
          label="Название задачи"
          placeholder="именуйте задачу"
          required
        />
        <Textarea
          {...form.getInputProps("taskDescription")}
          key={form.key("taskDescription")}
          label="Описание задачи"
          placeholder="описание к выполнению"
          autosize
          minRows={10}
          maxRows={50}
          required
        />
        <DateTimePicker
          {...form.getInputProps("deadline")}
          key={form.key("deadline")}
          clearable
          required
          label="Дата сдачи задачи"
          placeholder="выберите дату"
        />
        <MultiSelect
          {...form.getInputProps("executors")}
          key={form.key("executors")}
          label="Добавить участников"
          placeholder="список участников"
          data={arrayUserName}
          onChange={(val) => {
            setValue(val);
          }}
          searchable
          required
        />
        <FileInput
          label="Файлы"
          placeholder="импорт файлов"
          key={form.key("files")}
          {...form.getInputProps("files")}
          multiple
          onChange={(file) => {
            form.setFieldValue("files", file);
          }}
          size="sm"
        />
      </div>
      <div className="mt-7 grid">
        <Button type="submit" variant="outline" disabled={!form.isDirty()}>
          Добавить
        </Button>
      </div>
    </form>
  );
};

export default AddTask;
