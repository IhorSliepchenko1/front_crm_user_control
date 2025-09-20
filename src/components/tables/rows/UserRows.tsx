import {
  useIsActiveUserMutation,
  useLazyGetUsersQuery,
} from "@/app/services/user/userApi";
import type { GetUserData } from "@/app/services/user/userTypes";
import { Button, Table } from "@mantine/core";

type Props = {
  users: GetUserData[];
  page: number;
  limit: number;
  active: boolean;
};

const UserRows: React.FC<Props> = ({ users, page, limit, active }) => {
  const [isActive] = useIsActiveUserMutation();
  const [triggerUsers] = useLazyGetUsersQuery();

  const changeStatus = async (id: string) => {
    try {
      await isActive(id).unwrap();
      await triggerUsers({ page, limit, active }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.id} className="text-[12px]">
      <Table.Td onClick={() => console.log(user.id)}>{user.name}</Table.Td>
      <Table.Td>{user.created_at}</Table.Td>
      <Table.Td>{user.creator_projects}</Table.Td>
      <Table.Td>{user.participant_projects}</Table.Td>
      <Table.Td>{user.count_tasks}</Table.Td>
      <Table.Td>{user.done_tasks}</Table.Td>
      <Table.Td>{user.in_reviews_tasks}</Table.Td>
      <Table.Td>{user.in_progress_tasks}</Table.Td>
      <Table.Td>{user.canceled_task}</Table.Td>

      <Table.Td>
        <span
          className={`text-[${
            user.roles.includes("ADMIN") ? "teal" : "orange"
          }]`}
        >
          {user.roles.includes("ADMIN") ? "ADMIN" : "USER"}
        </span>
      </Table.Td>
      <Table.Td>
        {
          <Button
            variant="light"
            color={user.is_active ? "red" : "green"}
            size="xs"
            onClick={() => changeStatus(user.id)}
          >
            {user.is_active ? "blocked" : "active"}
          </Button>
        }
      </Table.Td>
    </Table.Tr>
  ));
  return <Table.Tbody>{rows}</Table.Tbody>;
};

export default UserRows;
