import { useProjectByIdQuery } from "@/app/services/projects/projectsApi";
import { useGetUsersProjectQuery } from "@/app/services/user/userApi";
import AddPartiants from "@/components/forms/AddPartiants";
import RemovePartians from "@/components/forms/RemovePartians/RemovePartians";
import ProjectData from "@/components/data/ProjectData";
import Loader from "@/components/UI/Loader";
import PageTitle from "@/components/UI/PageTitle";
import { Divider, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import RenameProject from "@/components/forms/RenameProject";
import { useEffect } from "react";

type Partiants = {
  id: string;
  login: string;
};

const Project = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useProjectByIdQuery(id as string);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate(-1);
    }
  }, [isError]);

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
      <div className="mt-10 flex gap-5">
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
          <div className="grid gap-4">
            <AddPartiants
              projectId={id as string}
              users={removeCurentUsers as Partiants[]}
            />
            <RenameProject projectId={id as string} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
