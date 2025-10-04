import {
  useLazyTaskByIdQuery,
  useUpdateExecutorByTaskIdMutation,
} from "@/app/services/tasks/tasksApi";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Button, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import { useEditor } from "@tiptap/react";
import Editor from "../UI/Editor";

type UpdateExecutorTaskFormData = {
  files?: Array<File>;
};

type Props = {
  taskId: string;
  close: () => void;
  executorDescription: string;
};

const UpdateExecutorTaskForm: React.FC<Props> = ({
  taskId,
  close,
  executorDescription,
}) => {
  const form = useForm<UpdateExecutorTaskFormData>({
    mode: "uncontrolled",
    initialValues: {
      files: [],
    },
    validate: {
      files: (value) =>
        value && value.some((f) => f.size > 5 * 1024 * 1024)
          ? "Максимальный размер файла 5МБ!"
          : value && value?.length > 5
          ? "Максимальное к-во файлов 5шт!"
          : null,
    },
  });

  const [updateTaskById] = useUpdateExecutorByTaskIdMutation();
  const [triggerTaskById] = useLazyTaskByIdQuery();
  const { succeed, error } = useNotification();

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
    content: executorDescription,
  });

  const html = editor?.getHTML();

  const onSubmit = async (data: UpdateExecutorTaskFormData) => {
    try {
      const { files } = data;
      const formData = new FormData();
      formData.append("executorDescription", html);
      if (files && files.length) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }
      const { message } = await updateTaskById({ taskId, formData }).unwrap();
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
          Добавить
        </Button>
      </form>
    </div>
  );
};

export default UpdateExecutorTaskForm;
