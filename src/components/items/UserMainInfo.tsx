import UserData from "../data/UserData";
import UserUpdateForm from "../forms/UserUpdateForm";
import UserAvatar from "../UI/UserAvatar";

type Props = {
  avatar: string;
  name: string;
  id: string;

  userData: {
    title: string;
    value: any;
  }[];

  isAdmin: boolean;
};

const UserMainInfo: React.FC<Props> = ({
  avatar,
  name,
  id,
  userData,
  isAdmin,
}) => {
  return (
    <div className="grid lg:flex lg:justify-start lg:gap-10">
      <div className="flex mt-5 justify-between lg:justify-start gap-10">
        <UserAvatar avatar={avatar} name={name} />
        <UserData userData={userData} />
      </div>
      {isAdmin && <UserUpdateForm id={id} name={name} />}
    </div>
  );
};

export default UserMainInfo;
