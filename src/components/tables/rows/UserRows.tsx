import { myInfo } from "@/app/features/authSlice";
import { useAppSelector } from "@/app/hooks";
import { useLogoutByIdMutation } from "@/app/services/auth/authApi";
import {
  useIsActiveUserMutation,
  useLazyGetUsersQuery,
} from "@/app/services/user/userApi";
import type { UserData } from "@/app/services/user/userTypes";
import { useChangePage } from "@/hooks/useChangePage";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { Anchor, Avatar, Badge, Button,Table } from "@mantine/core";

type Props = {
  users: UserData[];
  page: number;
  limit: number;
  active: boolean;
  isAdmin: boolean;
};
const url = import.meta.env.VITE_API_URL;

const UserRows: React.FC<Props> = ({ users, page, limit, active, isAdmin }) => {
  const { succeed, error } = useNotification();
  const [isActive] = useIsActiveUserMutation();
  const [triggerUsers] = useLazyGetUsersQuery();
  const [logoutUserById] = useLogoutByIdMutation();
  const { name } = useAppSelector(myInfo);

  const { changePage } = useChangePage();

  const changeStatus = async (id: string) => {
    try {
      const { message } = await isActive(id).unwrap();
      await triggerUsers({ page, limit, active }).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    }
  };

  const logoutUserByIdSession = async (id: string) => {
    try {
      const { message } = await logoutUserById(id).unwrap();
      await triggerUsers({ page, limit, active }).unwrap();
      succeed(message);
    } catch (err) {
      error(errorMessages(err));
    }
  };

  const rows = users.map((user) => (
    <Table.Tr key={user.id} className="text-[12px]">
      <Table.Td
        onClick={() => changePage(user.id, "user")}
        className="text-[8px]"
      >
        <Anchor underline="hover">{user.name}</Anchor>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-center items-end">
          {user.avatarPath ? (
            <Avatar src={`${url}/avatars/${user.avatarPath}`} alt="it's user" />
          ) : (
            <Avatar name={user.name} color="initials" />
          )}

          <span
            style={{
              width: 5,
              height: 5,
              background: user.is_online ? "green" : "red",
              display: "block",
              borderRadius: "50%",
            }}
          ></span>
        </div>
      </Table.Td>

      <Table.Td>{user.created_at}</Table.Td>
      <Table.Td>{user.creator_projects}</Table.Td>
      <Table.Td>{user.participant_projects}</Table.Td>
      <Table.Td>{user.count_tasks}</Table.Td>
      <Table.Td>{user.in_progress_tasks}</Table.Td>
      <Table.Td>{user.in_reviews_tasks}</Table.Td>
      <Table.Td>{user.done_tasks}</Table.Td>
      <Table.Td>{user.canceled_task}</Table.Td>

      <Table.Td>
        <Badge color={user.roles.includes("ADMIN") ? "teal" : "orange"}>
          {user.roles.includes("ADMIN") ? "ADMIN" : "USER"}
        </Badge>
      </Table.Td>
      {isAdmin && (
        <Table.Td>
          {
            <Button
              variant="light"
              color={user.is_active ? "red" : "green"}
              size="xs"
              onClick={() => changeStatus(user.id)}
              disabled={name === user.name}
            >
              {user.is_active ? "blocked" : "active"}
            </Button>
          }
        </Table.Td>
      )}
      {isAdmin && (
        <Table.Td>
          {
            <Button
              color={"dark"}
              size="xs"
              onClick={() => logoutUserByIdSession(user.id)}
              disabled={name === user.name}
            >
              {"выход"}
            </Button>
          }
        </Table.Td>
      )}
    </Table.Tr>
  ));
  return <Table.Tbody>{rows}</Table.Tbody>;
};

export default UserRows;
