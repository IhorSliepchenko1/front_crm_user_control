import { useUserByIdQuery } from "@/app/services/user/userApi";
import Loader from "@/components/UI/Loader";
import { Divider, Title } from "@mantine/core";
import UserMainInfo from "@/components/items/UserMainInfo";
import ProjectsWithMe from "@/components/data/ProjectsWithMe";

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
          <UserMainInfo
            avatar={avatar}
            name={name as string}
            id={"my-profile"}
            userData={userData}
            isAdmin={true}
          />
          <Divider my="md" />
          <ProjectsWithMe />
        </>
      )}
    </>
  );
};

export default Home;
