import { isAdminRole } from "@/app/features/authSlice";
import { useAppSelector } from "@/app/hooks";
import { useGetUsersQuery } from "@/app/services/user/userApi";
import Pagination from "@/components/UI/Pagination";
import Register from "@/components/forms/Register";
import UserHeader from "@/components/tables/headers/UserHeader";
import UserRows from "@/components/tables/rows/UserRows";
import Loader from "@/components/UI/Loader";
import { Button, NativeSelect, Table } from "@mantine/core";
import { useState } from "react";

const Users = () => {
  const isAdmin = useAppSelector(isAdminRole);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(25);
  const [active, setIsActive] = useState(true);

  const { data, isLoading } = useGetUsersQuery({ page, limit, active });

  const total = data?.data?.count_pages ?? 1;
  const users = data?.data?.users ?? [];

  const changeActive = (args: boolean) => {
    setIsActive(args);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {isAdmin && <Register page={page} limit={limit} active={active} />}

          <div className="flex items-end justify-between mb-2">
            {isAdmin && (
              <Button.Group>
                <Button
                  variant="light"
                  color={active ? "green" : "gray"}
                  onClick={() => changeActive(true)}
                >
                  active
                </Button>
                <Button
                  variant="light"
                  color={!active ? "red" : "gray"}
                  onClick={() => changeActive(false)}
                >
                  blocked
                </Button>
              </Button.Group>
            )}
            <NativeSelect
              value={limit}
              label={"К-во"}
              onChange={(event) => setLimit(+event.currentTarget.value)}
              data={["25", "50", "75", "100"]}
            />
          </div>

          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <UserHeader isAdmin={Boolean(isAdmin)} />
            <UserRows
              users={users}
              page={page}
              limit={limit}
              active={active}
              isAdmin={Boolean(isAdmin)}
            />
          </Table>

          <Pagination total={total} setPage={setPage} />
        </div>
      )}
    </>
  );
};

export default Users;
