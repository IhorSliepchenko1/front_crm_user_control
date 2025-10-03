import { Avatar } from "@mantine/core";

type Props = {
  avatar: string;
  name: string;
};
const UserAvatar: React.FC<Props> = ({ avatar, name }) => {
  const url = import.meta.env.VITE_API_URL;

  return (
    <span>
      {avatar ? (
        <Avatar
          radius="xl"
          src={`${url}/avatars/${avatar}`}
          style={{ width: 200, height: 400 }}
        />
      ) : (
        <Avatar
          color="initials"
          radius="xl"
          size="xl"
          name={name}
          style={{ width: 200, height: 400 }}
        />
      )}
    </span>
  );
};

export default UserAvatar;
