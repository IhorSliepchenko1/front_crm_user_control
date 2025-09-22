import { Avatar, Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./NavBar.module.scss";
import { useAppSelector } from "@/app/hooks";
import {
  useLazyGetMeQuery,
  useLogoutMeMutation,
} from "@/app/services/auth/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { House, LogOut, Users } from "lucide-react";

interface NavbarLinkProps {
  icon: typeof House;
  label: string;
  active?: boolean;
  onClick?: () => void;
  navigate?: string;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon size={20} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: House, label: "Домой", navigate: "/" },
  { icon: Users, label: "Пользователи", navigate: "/users" },
];

export function NavBar() {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = mockdata.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={pathname === link.navigate}
      onClick={() => {
        navigate(link.navigate as string);
      }}
    />
  ));

  const { userData } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMeMutation();
  const [triggerMe] = useLazyGetMeQuery();
  const logoutSession = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
      triggerMe();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className={classes.navbar}>
      <Center>
        {userData?.avatarPath ? (
          <Avatar src={`${url}/${userData?.avatarPath}`} alt="it's me" />
        ) : (
          <Avatar name={userData?.name} color="initials" />
        )}
      </Center>

      <div className={classes.navbarMain}>
        <span className="flex justify-center">
          <Stack justify="center" gap={5}>
            {links}
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
}
