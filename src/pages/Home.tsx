import { useUserByIdQuery } from "@/app/services/user/userApi";
import UserUpdateForm from "@/components/forms/UserUpdateForm";
import Loader from "@/components/UI/Loader";
import UserAvatar from "@/components/UI/UserAvatar";
import UserData from "@/components/UserData";
import { Divider, Title } from "@mantine/core";

const Home = () => {
  const { data, isLoading } = useUserByIdQuery("my-profile");
  const avatar = data?.data?.find((item) => item.title === "avatarPath")?.value;
  const name = data?.data?.find((item) => item.title === "имя")?.value;
  const userData = data?.data ? data?.data : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Title order={2}>Мой профиль</Title>
          <div className="flex justify-start gap-10 py-10">
            <UserAvatar avatar={avatar} name={name} />
            <UserData userData={userData} />
            <UserUpdateForm id={"my-profile"} name={name as string} />
          </div>
          <Divider my="md" />
        </>
      )}
    </>
  );
};

export default Home;
