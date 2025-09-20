import Loader from "@/components/UI/Loader";
import { useGetMeQuery } from "@/app/services/auth/authApi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = { children: React.ReactNode };
export const AuthGuard: React.FC<Props> = ({ children }) => {
  const { data, isLoading, isError } = useGetMeQuery();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoading && (!data || isError)) {
      navigate("/login");
    }
  }, [isLoading]);

  useEffect(() => {
    if (data && pathname === "/login") {
      navigate("/");
    }

    if (data && !data.roles.includes("ADMIN") && pathname === "/admin") {
      alert("У вас отсутствуют права доступа");
      navigate("/");
    }
  }, [data]);

  return <>{isLoading ? <Loader /> : children}</>;
};
