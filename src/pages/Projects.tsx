import { useProjectAllQuery } from "@/app/services/projects/projectsApi";
import AddProject from "../components/AddProject";

const Projects = () => {
  const { data, isLoading } = useProjectAllQuery({
    page: 1,
    limit: 10,
    active: true,
  });

  console.log(data?.data?.projects);

  return (
    <div>
      <AddProject />
    </div>
  );
};

export default Projects;
