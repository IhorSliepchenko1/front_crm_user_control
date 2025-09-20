import { isAdminRole } from "@/app/features/authSlice";
import { useAppSelector } from "@/app/hooks";
import { useUserByIdQuery } from "@/app/services/user/userApi";
import Loader from "@/components/UI/Loader";
import { Avatar } from "@mantine/core";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;
  const isAdmin = useAppSelector(isAdminRole);
  const { data, isLoading } = useUserByIdQuery(id as string);
  const avatar = data?.data?.avatarPath;
  const name = data?.data?.name;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="grid max-w-[200px] justify-center text-center">
            <span className="flex justify-center">
              {avatar ? (
                <Avatar
                  radius="xl"
                  src={`${url}/${avatar}`}
                  style={{ width: 150, height: 150 }}
                />
              ) : (
                <Avatar
                  color="initials"
                  radius="xl"
                  size="xl"
                  name={name}
                  style={{ width: 150, height: 150 }}
                />
              )}
            </span>
            <strong>{name}</strong>
          </div>

          <div className="grid max-w-[250px] mt-10 gap-2">
            <div className="flex justify-between">
              <span>создан:</span>
              <strong>{data?.data?.created_at}</strong>
            </div>

            <div className="flex justify-between">
              <span>личные проекты:</span>
              <strong>{data?.data?.creator_projects}</strong>
            </div>

            <div className="flex justify-between">
              <span>участник проектов:</span>
              <strong>{data?.data?.participant_projects}</strong>
            </div>

            <div className="flex justify-between">
              <span>к-во задач:</span>
              <strong>{data?.data?.count_tasks}</strong>
            </div>

            <div className="flex justify-between">
              <span>выполненные задачи:</span>
              <strong>{data?.data?.done_tasks}</strong>
            </div>

            <div className="flex justify-between">
              <span>задачи на проверке:</span>
              <strong>{data?.data?.in_reviews_tasks}</strong>
            </div>

            <div className="flex justify-between">
              <span>задачи в работе:</span>
              <strong>{data?.data?.in_progress_tasks}</strong>
            </div>

            <div className="flex justify-between">
              <span>отменённые задачи:</span>
              <strong>{data?.data?.canceled_task}</strong>
            </div>

            <div className="flex justify-between">
              <span>роль:</span>
              <strong>
                <span
                  style={{
                    color: data?.data?.roles.includes("ADMIN")
                      ? "teal"
                      : "orange",
                  }}
                >
                  {data?.data?.roles.includes("ADMIN") ? "ADMIN" : "USER"}
                </span>
              </strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
