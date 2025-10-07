import { useProjectByIdQuery } from "@/app/services/projects/projectsApi";
import { useGetUsersProjectQuery } from "@/app/services/user/userApi";
import ProjectData from "@/components/data/ProjectData";
import Loader from "@/components/UI/Loader";
import PageTitle from "@/components/UI/PageTitle";
import { Divider, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import RenameProject from "@/components/forms/RenameProject";
import { useEffect, useState } from "react";
import TaskData from "@/components/data/TaskData";
import { useTaskByProjectIdQuery } from "@/app/services/tasks/tasksApi";
import { useDisclosure } from "@mantine/hooks";
import RemoveParticipants from "@/components/forms/RemoveParticipants/RemoveParticipants";
import AddParticipants from "@/components/forms/AddParticipants";
import type { Status } from "@/app/services/projects/projectsTypes";
import CalendarModal from "@/components/modals/CalendarModal";
import type { User } from "@/app/services/user/userTypes";
import AddTaskModal from "@/components/modals/AddTaskModal";
import { useFromToDate } from "@/hooks/useFromToDate";
import type { CalendarValue, TModal } from "@/app/services/tasks/tasksTypes";
import { useSelector } from "react-redux";
import { myInfo } from "@/app/features/authSlice";

const procectDataDefault = {
  participants: [{ id: "", login: "" }],
  name: "",
  count_task: 0,
  creator: { id: "", login: "" },
};

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const [status, setStatus] = useState<Status | undefined>(undefined);
  const [value, setValue] = useState<CalendarValue>([null, null]);
  const [modal, setModal] = useState<TModal>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { deadlineFrom, deadlineTo } = useFromToDate(value);

  const projectQuery = {
    page,
    limit,
    projectId: id as string,
    status,
    deadlineFrom,
    deadlineTo,
  };

  const { data, isLoading, isError } = useProjectByIdQuery(id as string);
  const { data: users, isLoading: isLoadingUsers } = useGetUsersProjectQuery();
  const { data: tasksData, isLoading: isLoadingTasks } =
    useTaskByProjectIdQuery(projectQuery);
  const myInfoData = useSelector(myInfo);
  const tasks = tasksData?.data?.tasks ?? [];
  const total = tasksData?.data?.count_pages ?? 1;
  const projectData = data?.data?.project ?? procectDataDefault;
  const { participants, name, count_task, creator } = projectData;

  const projectInfo = [
    { title: "Куратор", value: creator.login },
    { title: "К-во участников", value: participants.length },
    { title: "К-во задач", value: count_task },
  ];

  const removeCurentUsers = users?.data?.filter((u) => {
    return !participants?.some((p) => p.id === u.id);
  });

  const isLoadData = isLoading && isLoadingUsers && isLoadingTasks;

  useEffect(() => {
    if (isError) {
      navigate(-1);
    }
  }, [isError]);

  return isLoadData ? (
    <Loader />
  ) : (
    <div>
      <PageTitle title={"Проект "} cursive={name} />
      <div className="mt-10 grid xl:flex gap-5">
        <div className="flex gap-5">
          <ProjectData projectInfo={projectInfo} />
          {(myInfoData.name === creator.login ||
            myInfoData.roles.includes("ADMIN")) && (
            <>
              <Divider orientation="vertical" />
              <div>
                <Title order={4}>Участники</Title>
                <RemoveParticipants
                  projectId={id as string}
                  participants={participants}
                  projectQuery={projectQuery}
                />
              </div>
            </>
          )}
        </div>
        {(myInfoData.name === creator.login ||
          myInfoData.roles.includes("ADMIN")) && (
          <>
            <Divider orientation="vertical" />
            <div className="xl:w-[30%]">
              <div className="grid gap-4">
                <AddParticipants
                  projectId={id as string}
                  users={removeCurentUsers as User[]}
                />
                <RenameProject projectId={id as string} />
              </div>
            </div>
          </>
        )}
      </div>

      <Divider my="md" />
      <TaskData
        open={open}
        creatorName={creator.login}
        tasks={tasks}
        total={total}
        page={page}
        limit={limit}
        setModal={setModal}
        setPage={setPage}
        setLimit={setLimit}
        setStatus={setStatus}
        projectQuery={projectQuery}
      />
      <CalendarModal
        modal={modal}
        value={value}
        setValue={setValue}
        opened={opened}
        close={close}
      />

      <AddTaskModal
        modal={modal}
        opened={opened}
        close={close}
        projectQuery={projectQuery}
        participants={participants}
      />
    </div>
  );
};

export default Project;
