import { NativeSelect, Table } from "@mantine/core";
import TableScrolContainer from "../UI/TableScrolContainer";
import ProjectHeader from "../tables/headers/ProjectHeader";
import ProjectRows from "../tables/rows/ProjectRows";
import Pagination from "../UI/Pagination";
import { useState } from "react";
import { useProjectsWithMeQuery } from "@/app/services/projects/projectsApi";
import Loader from "../UI/Loader";
import { useParams } from "react-router-dom";

const ProjectsWithMe = () => {
  const { id } = useParams();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);

  const { data, isLoading } = useProjectsWithMeQuery({
    page,
    limit,
    userId: id,
  });

  const total = data?.data?.count_pages ?? 1;
  const projects = data?.data?.projects ?? [];

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div className="flex items-end justify-end mb-2">
        <NativeSelect
          value={limit}
          label={"К-во"}
          size="xs"
          onChange={(event) => setLimit(+event.currentTarget.value)}
          data={["25", "50", "75", "100"]}
        />
      </div>

      {projects.length < 1 ? (
        <p className="text-center text-[20px]">Отсутстуют проекты для показа</p>
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
                isRoute={false}
              />
            </Table>
          </TableScrolContainer>
          <Pagination total={total} setPage={setPage} />
        </>
      )}
    </div>
  );
};

export default ProjectsWithMe;
