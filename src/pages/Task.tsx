import { useTaskByIdQuery } from "@/app/services/tasks/tasksApi";
import { useParams } from "react-router-dom";

const Task = () => {
  const { id } = useParams();
  const { data, isLoading } = useTaskByIdQuery(id);
  console.log(data);
  return <div></div>;
};

export default Task;
