import { useLogoutMutation } from "@/app/services/auth/authApi";
import { useNavigate } from "react-router-dom";
import { isErrorMessage } from "@/utils/is-error-message";
import { Button } from "@mantine/core";
import { LogOut } from "lucide-react";

const Header = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const logoutSession = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.log(isErrorMessage(error));
    }
  };

  return (
    <header className="py-2.5 px-3.5 flex justify-end">
      <Button
        onClick={logoutSession}
        rightSection={<LogOut />}
        size="xs"
        color="red"
      >
        Выйти
      </Button>
    </header>
  );
};

export default Header;
