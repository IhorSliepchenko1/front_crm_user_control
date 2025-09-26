import { useProjectByIdQuery } from "@/app/services/projects/projectsApi";
import { useGetUsersProjectQuery } from "@/app/services/user/userApi";
import AddPartiants from "@/components/AddPartiants";
import RemovePartians from "@/components/forms/RemovePartians/RemovePartians";
import ProjectData from "@/components/ProjectData";
import Loader from "@/components/UI/Loader";
import PageTitle from "@/components/UI/PageTitle";
import { Divider, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

type Partiants = {
  id: string;
  login: string;
};

const Project = () => {
  const { id } = useParams();
  const { data, isLoading } = useProjectByIdQuery(id as string);
  const { data: users, isLoading: isLoadingUsers } = useGetUsersProjectQuery();

  const project = data?.data?.project;
  const name = project?.name;
  const creator = project?.creator.login;
  const partiants = project?.participants;
  const countParticipants = partiants?.length;
  const countTasks = project?.tasks?.length;

  const projectInfo = [
    { title: "Куратор", value: creator ?? "" },
    { title: "К-во участников", value: countParticipants ?? 0 },
    { title: "К-во задач", value: countTasks ?? 0 },
  ];

  const removeCurentUsers = users?.data?.filter((u) => {
    return !partiants?.some((p) => p.id === u.id);
  });

  return isLoading && isLoadingUsers ? (
    <Loader />
  ) : (
    <>
      <PageTitle title={"Проект "} cursive={name} />
      <div className="mt-10 flex gap-15">
        <ProjectData projectInfo={projectInfo} />
        <Divider orientation="vertical" />
        <div>
          <Title order={4}>Участники</Title>
          <RemovePartians
            projectId={id as string}
            partiants={partiants as Partiants[]}
          />
        </div>
        <Divider orientation="vertical" />
        <div className="w-[30%]">
          <Title order={4}>Добавить участников</Title>
          <AddPartiants
            projectId={id as string}
            users={removeCurentUsers as Partiants[]}
          />
        </div>
      </div>
    </>
  );
};

export default Project;
