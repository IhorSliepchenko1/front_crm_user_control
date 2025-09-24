import { useNavigate } from "react-router-dom";

export const useChangePage = () => {
  const navigate = useNavigate();

  const changePage = (id: string, route: string) => {
    navigate(`${route}/${id}`);
  };
  return { changePage };
};
