import {
  useLazyTaskByIdQuery,
  useUpdateCreatorByTaskIdMutation,
} from "@/app/services/tasks/tasksApi";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Button, FileInput, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import Editor from "../UI/Editor";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";
import type { User } from "@/app/services/user/userTypes";
import { useExstractId } from "@/hooks/useExstractId";

type UpdateCreatorTaskFormData = {
  name: string;
  deadline: string;
  executorsAdd: string[];
  files?: Array<File>;
};

type Props = {
  name: string;
  deadline: string;
  taskId: string;
  close: () => void;
  participants: User[];
  taskDescription: string;
};

const UpdateCreatorTaskForm: React.FC<Props> = ({
  taskId,
  close,
  taskDescription,
  name,
  deadline,
  participants,
}) => {
  const validateDeadline = (date: string) => {
    const now = new Date().toLocaleString();
    const deadline = new Date(date).toLocaleString();
    return now > deadline;
  };
  const [value, setValue] = useState<string[]>([]);
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({ link: false }),
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: taskDescription,
  });

  const html = editor?.getHTML();
  const form = useForm<UpdateCreatorTaskFormData>({
    mode: "uncontrolled",
    initialValues: {
      name,
      deadline,
      executorsAdd: [],
      files: [],
    },
    validate: {
      files: (value) =>
        value && value.some((f) => f.size > 5 * 1024 * 1024)
          ? "Максимальный размер файла 5МБ!"
          : value && value?.length > 5
          ? "Максимальное к-во файлов 5шт!"
          : null,
      name: (value) =>
        value && (value.length > 30 || value.length < 5)
          ? "Длина символов должна быть в диапазоне 5-30!"
          : null,

      deadline: (value) =>
        value && value !== deadline && validateDeadline(value)
          ? "Дата сдачи результатов может быть только больше текущей!"
          : null,

      executorsAdd: () =>
        value.length > 5
          ? "К-во участников должно быть в пределах от 1 - 5"
          : null,
    },
  });

  const [updateCreatorTaskById] = useUpdateCreatorByTaskIdMutation();
  const [triggerTaskById] = useLazyTaskByIdQuery();
  const { succeed, error } = useNotification();

  const arrayUserName = participants.map((p) => p.login);
  const { exstract } = useExstractId("login", "id");

  const onSubmit = async (data: UpdateCreatorTaskFormData) => {
    try {
      const executorsAdd = exstract({
        str: value,
        obj: participants,
      });

      const formData = new FormData();
      if (data.name && data.name !== name) formData.append("name", data.name);
      if (data.deadline)
        formData.append("deadline", new Date(data.deadline).toISOString());
      if (taskDescription !== html) formData.append("taskDescription", html);
      if (executorsAdd.length)
        formData.append("executorsAdd", JSON.stringify(executorsAdd));

      if (data.files && data.files.length) {
        data.files.forEach((file) => {
          formData.append("files", file);
        });
      }
      const { message } = await updateCreatorTaskById({
        taskId,
        formData,
      }).unwrap();
      await triggerTaskById(taskId).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    } finally {
      close();
      form.reset();
    }
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)} className="grid gap-3">
        <TextInput
          {...form.getInputProps("name")}
          key={form.key("name")}
          label="Название задачи"
          placeholder="именуйте задачу"
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
          {...form.getInputProps("executorsAdd")}
          key={form.key("executorsAdd")}
          label="Добавить участников"
          placeholder="список участников"
          data={arrayUserName}
          onChange={(val) => {
            setValue(val);
          }}
          searchable
          required
        />
        <Editor editor={editor} />
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

        <Button type="submit" variant="outline" color="green">
          Изменить
        </Button>
      </form>
    </div>
  );
};

export default UpdateCreatorTaskForm;
