import { isAdminRole } from "@/app/features/authSlice";
import { useAppSelector } from "@/app/hooks";
import { useUserByIdQuery } from "@/app/services/user/userApi";
import UserUpdateForm from "@/components/forms/UserUpdateForm";
import Loader from "@/components/UI/Loader";
import UserAvatar from "@/components/UI/UserAvatar";
import UserData from "@/components/UserData";
import { Divider, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import PrevPage from "@/components/UI/PrevPage";

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
        <>
          <div className="flex justify-between max-w-[500px] items-center">
            <PrevPage />
            <Title order={2}>Информация о пользователе</Title>
          </div>
          <div className="flex justify-start gap-10 py-10">
            <UserAvatar avatar={avatar} name={name} />
            <UserData userData={userData} />
            {isAdmin && (
              <UserUpdateForm id={id as string} name={name as string} />
            )}
          </div>
          <Divider my="md" />
        </>
      )}
    </>
  );
};

export default User;
