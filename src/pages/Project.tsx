import { useProjectByIdQuery } from "@/app/services/projects/projectsApi";
import RemovePartians from "@/components/forms/RemovePartians/RemovePartians";
import ProjectData from "@/components/ProjectData";
import Loader from "@/components/UI/Loader";
import PageTitle from "@/components/UI/PageTitle";
import { Divider, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

const Project = () => {
  const { id } = useParams();
  const { data, isLoading } = useProjectByIdQuery(id as string);

  const project = data?.data?.project;
  const name = project?.name;
  const creator = project?.creator.login;
  const countParticipants = project?.participants?.length;
  const countTasks = project?.tasks?.length;
  const partiants = project?.participants;

  const projectInfo = [
    { title: "Название", value: name ?? "" },
    { title: "Куратор", value: creator ?? "" },
    { title: "К-во участников", value: countParticipants ?? 0 },
    { title: "К-во задач", value: countTasks ?? 0 },
  ];
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <PageTitle title={"Информация о проекте"} />
      <div className="mt-10 flex gap-15">
        <ProjectData projectInfo={projectInfo} />
        <Divider orientation="vertical" />
        <div>
          <Title order={4}>Участники</Title>
          <RemovePartians
            projectId={id as string}
            partiants={
              partiants as {
                id: string;
                login: string;
              }[]
            }
          />
        </div>
      </div>
    </>
  );
};

export default Project;
