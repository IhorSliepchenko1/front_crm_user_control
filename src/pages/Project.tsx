import { useProjectByIdQuery } from "@/app/services/projects/projectsApi";
import { useGetUsersProjectQuery } from "@/app/services/user/userApi";
import AddPartiants from "@/components/forms/AddPartiants";
import RemovePartians from "@/components/forms/RemovePartians/RemovePartians";
import ProjectData from "@/components/data/ProjectData";
import Loader from "@/components/UI/Loader";
import PageTitle from "@/components/UI/PageTitle";
import { Divider, Modal, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import RenameProject from "@/components/forms/RenameProject";
import { useEffect, useMemo, useState } from "react";
import TaskData from "@/components/data/TaskData";
import { useTaskByProjectIdQuery } from "@/app/services/tasks/tasksApi";
import { useDisclosure } from "@mantine/hooks";
import { DatePicker } from "@mantine/dates";

type Partiants = {
  id: string;
  login: string;
};

const Project = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const [status, setStatus] = useState<
    "IN_REVIEW" | "IN_PROGRESS" | "DONE" | "CANCELED" | undefined
  >(undefined);

  const [value, setValue] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  const [opened, { open, close }] = useDisclosure(false);

  const fromToDate = useMemo(() => {
    if (value[0] !== null) {
      const [start, end] = value;

      const deadlineFrom = start ? `${start}T00:00:00.000Z` : undefined;
      const deadlineTo = end
        ? `${end}T23:59:59.000Z`
        : !end && start
        ? `${start}T00:00:00.000Z`
        : undefined;

      return { deadlineFrom, deadlineTo };
    }

    return { deadlineFrom: undefined, deadlineTo: undefined };
  }, [value]);

  const { id } = useParams();
  const { data, isLoading, isError } = useProjectByIdQuery(id as string);
  const { data: users, isLoading: isLoadingUsers } = useGetUsersProjectQuery();
  const { data: tasksData, isLoading: isLoadingTasks } =
    useTaskByProjectIdQuery({
      page,
      limit,
      projectId: id as string,
      status,
      deadlineFrom: fromToDate.deadlineFrom,
      deadlineTo: fromToDate.deadlineTo,
    });

  const tasks = tasksData?.data?.tasks ?? [];
  const total = tasksData?.data?.count_pages ?? 1;

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate(-1);
    }
  }, [isError]);

  const project = data?.data?.project;
  const name = project?.name;
  const creator = project?.creator.login;
  const partiants = project?.participants;
  const countParticipants = partiants?.length;
  const countTasks = project?.count_task;

  const projectInfo = [
    { title: "Куратор", value: creator ?? "" },
    { title: "К-во участников", value: countParticipants ?? 0 },
    { title: "К-во задач", value: countTasks ?? 0 },
  ];

  const removeCurentUsers = users?.data?.filter((u) => {
    return !partiants?.some((p) => p.id === u.id);
  });

  const isLoadData = isLoading && isLoadingUsers && isLoadingTasks;

  return isLoadData ? (
    <Loader />
  ) : (
    <div>
      <PageTitle title={"Проект "} cursive={name} />
      <div className="mt-10 grid xl:flex gap-5">
        <div className="flex gap-5">
          <ProjectData projectInfo={projectInfo} />
          <Divider orientation="vertical" />
          <div>
            <Title order={4}>Участники</Title>
            <RemovePartians
              projectId={id as string}
              partiants={partiants as Partiants[]}
            />
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="xl:w-[30%]">
          <div className="grid gap-4">
            <AddPartiants
              projectId={id as string}
              users={removeCurentUsers as Partiants[]}
            />
            <RenameProject projectId={id as string} />
          </div>
        </div>
      </div>
      <Divider my="md" />
      <Modal opened={opened} onClose={close} size="xs">
        <div className="flex justify-center items-center">
          <DatePicker type="range" value={value} onChange={setValue} />
        </div>
      </Modal>
      <TaskData
        tasks={tasks}
        total={total}
        page={page}
        limit={limit}
        setPage={setPage}
        setLimit={setLimit}
        setStatus={setStatus}
        open={open}
      />
    </div>
  );
};

export default Project;
