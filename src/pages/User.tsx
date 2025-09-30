import { isAdminRole } from "@/app/features/authSlice";
import { useAppSelector } from "@/app/hooks";
import { useUserByIdQuery } from "@/app/services/user/userApi";
import Loader from "@/components/UI/Loader";
import { Divider } from "@mantine/core";
import { useParams } from "react-router-dom";
import PageTitle from "@/components/UI/PageTitle";
import UserMainInfo from "@/components/items/UserMainInfo";

const User = () => {
  const { id } = useParams();
  const isAdmin = useAppSelector(isAdminRole);
  const { data, isLoading } = useUserByIdQuery(id as string);
  const avatar = data?.data?.find((item) => item.title === "avatarPath")?.value;
  const name = data?.data?.find((item) => item.title === "имя")?.value;
  const userData = data?.data ? data?.data : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PageTitle title="Информация о пользователе" />
          <UserMainInfo
            avatar={avatar}
            name={name as string}
            id={id as string}
            userData={userData}
            isAdmin={isAdmin as boolean}
          />
          <Divider my="md" />
        </div>
      )}
    </>
  );
};

export default User;
