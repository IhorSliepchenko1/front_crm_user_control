import { useAppSelector } from "@/app/hooks";
import AddProject from "../components/forms/AddProject";
import { isAdminRole } from "@/app/features/authSlice";
import { useState } from "react";
import { useProjectAllQuery } from "@/app/services/projects/projectsApi";
import Loader from "@/components/UI/Loader";
import { Button, NativeSelect, Table } from "@mantine/core";
import ProjectHeader from "@/components/tables/headers/ProjectHeader";
import Pagination from "@/components/UI/Pagination";
import ProjectRows from "@/components/tables/rows/ProjectRows";
import TableScrolContainer from "@/components/UI/TableScrolContainer";
import { useGetUsersProjectQuery } from "@/app/services/user/userApi";
import { useChangeActive } from "@/hooks/useChangeActive";

type Users = {
  id: string;
  login: string;
}[];

const Projects = () => {
  const isAdmin = useAppSelector(isAdminRole);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const [isMy, setIsMy] = useState(false);
  const { active, changeActive } = useChangeActive();

  const { data, isLoading } = useProjectAllQuery({
    page,
    limit,
    active,
    ...(isAdmin && { my: isMy }),
  });

  const { data: users, isLoading: isLoadingUsers } = useGetUsersProjectQuery();
  const total = data?.data?.count_pages ?? 1;
  const projects = data?.data?.projects ?? [];

  const isLoad = isLoadingUsers && isLoading;

  return (
    <>
      {isLoad ? (
        <Loader />
      ) : (
        <div>
          <AddProject
            page={page}
            limit={limit}
            active={active}
            users={(users?.data as Users) ?? []}
          />
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

            <div className="flex items-end gap-2">
              {isAdmin && (
                <NativeSelect
                  label={"Проекты"}
                  onChange={(event) =>
                    setIsMy(event.currentTarget.value === "мои")
                  }
                  size="xs"
                  data={["все", "мои"]}
                />
              )}
              <NativeSelect
                value={limit}
                label={"К-во"}
                size="xs"
                onChange={(event) => setLimit(+event.currentTarget.value)}
                data={["25", "50", "75", "100"]}
              />
            </div>
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
                  <ProjectHeader isShowBtnTitle={true} />
                  <ProjectRows
                    projects={projects}
                    page={page}
                    limit={limit}
                    active={active}
                    isMy={isMy}
                    isShowBtn={true}
                    isRoute={true}
                  />
                </Table>
              </TableScrolContainer>
              <Pagination total={total} setPage={setPage} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Projects;
