import { Avatar, Center, Stack } from "@mantine/core";
import classes from "./NavBar.module.scss";
import { useAppSelector } from "@/app/hooks";
import {
  useLazyGetMeQuery,
  useLogoutMeMutation,
} from "@/app/services/auth/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { House, LogOut, Users, FolderKanban } from "lucide-react";
import NavbarLink from "@/components/UI/NavbarLink/NavbarLink";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { errorMessages } from "@/utils/is-error-message";
import { myInfo } from "@/app/features/authSlice";

const NavBar = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mockdata = [
    { icon: House, label: "Домой", navigate: "/" },
    { icon: Users, label: "Пользователи", navigate: "/users" },
    { icon: FolderKanban, label: "Проекты", navigate: "/projects" },
  ];

  const { name, avatarPath } = useAppSelector(myInfo);
  const [logout] = useLogoutMeMutation();
  const [triggerMe] = useLazyGetMeQuery();
  const { succeed, error } = useNotification();

  const logoutSession = async () => {
    try {
      const { message } = await logout().unwrap();
      navigate("/login");
      succeed(message);
      triggerMe();
    } catch (err) {
      error(errorMessages(err));
    }
  };
  return (
    <nav className={classes.navbar}>
      <Center>
        {avatarPath ? (
          <Avatar src={`${url}/avatars/${avatarPath}`} alt="it's me" />
        ) : (
          <Avatar name={name} color="initials" />
        )}
      </Center>

      <div className={classes.navbarMain}>
        <span className="flex justify-center">
          <Stack justify="center" gap={5}>
            {mockdata.map((link) => (
              <NavbarLink
                {...link}
                key={link.label}
                active={pathname === link.navigate}
                onClick={() => {
                  navigate(link.navigate as string);
                }}
              />
            ))}
          </Stack>
        </span>
      </div>

      <span className="flex justify-center">
        <Stack justify="center">
          <NavbarLink icon={LogOut} label="Выход" onClick={logoutSession} />
        </Stack>
      </span>
    </nav>
  );
};

export default NavBar;
