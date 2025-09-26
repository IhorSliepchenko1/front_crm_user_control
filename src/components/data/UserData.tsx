import { Divider } from "@mantine/core";

type Props = {
  userData: {
    title: string;
    value: any;
  }[];
};

const UserData: React.FC<Props> = ({ userData }) => {
  return (
    <div className="flex">
      <Divider size="sm" orientation="vertical" />
      <div className="grid w-[500px] px-5">
        {userData.map(
          (user, index) =>
            user.title !== "id" &&
            user.title !== "avatarPath" && (
              <div className="flex justify-between" key={index}>
                <span>{user.title}:</span>
                <strong>{user.value}</strong>
              </div>
            )
        )}
      </div>
      <Divider size="sm" orientation="vertical" />
    </div>
  );
};

export default UserData;
