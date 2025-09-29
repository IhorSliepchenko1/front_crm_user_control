import {
  useIsActiveProjectMutation,
  useLazyProjectAllQuery,
} from "@/app/services/projects/projectsApi";
import type { ProjectItem } from "@/app/services/projects/projectsTypes";
import { useChangePage } from "@/hooks/useChangePage";

import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Anchor, Button, Table } from "@mantine/core";

type Props = {
  projects: ProjectItem[];
  page: number;
  limit: number;
  active: boolean;
  isAdmin: boolean;
  isMy?: boolean;
};

const ProjectRows: React.FC<Props> = ({
  projects,
  page,
  limit,
  isAdmin,
  active,
  isMy,
}) => {
  const { succeed, error } = useNotification();

  const [isActive] = useIsActiveProjectMutation();
  const [triggerProjects] = useLazyProjectAllQuery();

  const { changePage } = useChangePage();

  const changeStatus = async (id: string) => {
    try {
      const { message } = await isActive(id).unwrap();
      await triggerProjects({
        page,
        limit,
        active,
        ...(isAdmin && { my: isMy }),
      }).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    }
  };

  const rows = projects.map((project) => (
    <Table.Tr key={project.id} className="text-[12px]">
      <Table.Td className="text-[8px]">
        <Anchor
          underline="hover"
          onClick={() => changePage(project.id, "project")}
        >
          {project.name}
        </Anchor>
      </Table.Td>
      <Table.Td>{project.created_at}</Table.Td>
      <Table.Td>
        <Anchor
          underline="hover"
          onClick={() => changePage(project.creatorId, "/users/user")}
        >
          {project.creator}
        </Anchor>
      </Table.Td>
      <Table.Td>{project.count_participants}</Table.Td>
      <Table.Td>{project.count_tasks}</Table.Td>
      <Table.Td>{project.in_progress_tasks}</Table.Td>
      <Table.Td>{project.in_reviews_tasks}</Table.Td>
      <Table.Td>{project.done_tasks}</Table.Td>
      <Table.Td>{project.canceled_task}</Table.Td>
      <Table.Td>
        {
          <Button
            variant="light"
            color={project.is_active ? "red" : "green"}
            size="xs"
            onClick={() => changeStatus(project.id)}
          >
            {project.is_active ? "blocked" : "active"}
          </Button>
        }
      </Table.Td>
    </Table.Tr>
  ));
  return <Table.Tbody>{rows}</Table.Tbody>;
};

export default ProjectRows;
