import { useUserByIdQuery } from "@/app/services/user/userApi";
import Loader from "@/components/UI/Loader";
import { Button, Divider, NativeSelect, Table, Title } from "@mantine/core";
import UserMainInfo from "@/components/items/UserMainInfo";
import { useProjectsWithMeQuery } from "@/app/services/projects/projectsApi";
import TableScrolContainer from "@/components/UI/TableScrolContainer";
import ProjectHeader from "@/components/tables/headers/ProjectHeader";
import ProjectRows from "@/components/tables/rows/ProjectRows";
import Pagination from "@/components/UI/Pagination";
import { useState } from "react";

const Home = () => {
  const { data, isLoading } = useUserByIdQuery("my-profile");
  const avatar = data?.data?.find((item) => item.title === "avatarPath")?.value;
  const name = data?.data?.find((item) => item.title === "имя")?.value;
  const userData = data?.data ? data?.data : [];
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const [active, setActive] = useState(true);

  const { data: projectsWithMe, isLoading: projectsWithMeLoading } =
    useProjectsWithMeQuery({
      page: 1,
      limit: 10,
      active: true,
    });

  const isLoad = projectsWithMeLoading && isLoading;
  const total = projectsWithMe?.data?.count_pages ?? 1;
  const projects = projectsWithMe?.data?.projects ?? [];

  const changeActive = (args: boolean) => {
    setActive(args);
  };

  return (
    <>
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <Title order={2}>Мой профиль</Title>
          <UserMainInfo
            avatar={avatar}
            name={name as string}
            id={"my-profile"}
            userData={userData}
            isAdmin={true}
          />
          <Divider my="md" />

          <div>
            <div className="flex items-end justify-between mb-2">
              <div className="flex items-end gap-2">
                <Button.Group>
                  <Button
                    variant="light"
                    color={active ? "green" : "gray"}
                    onClick={() => changeActive(true)}
                  >
                    active
                  </Button>
                  <Button
                    variant="light"
                    color={!active ? "red" : "gray"}
                    onClick={() => changeActive(false)}
                  >
                    blocked
                  </Button>
                </Button.Group>
              </div>

              <NativeSelect
                value={limit}
                label={"К-во"}
                size="xs"
                onChange={(event) => setLimit(+event.currentTarget.value)}
                data={["25", "50", "75", "100"]}
              />
            </div>

            {projects.length < 1 ? (
              <p className="text-center text-[20px]">
                Отсутстуют проекты для показа
              </p>
            ) : (
              <>
                <TableScrolContainer>
                  <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                    className="min-w-[1300px]"
                  >
                    <ProjectHeader />
                    <ProjectRows
                      projects={projects}
                      page={page}
                      limit={limit}
                      active={active}
                    />
                  </Table>
                </TableScrolContainer>
                <Pagination total={total} setPage={setPage} />
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
