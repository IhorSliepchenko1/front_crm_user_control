import { useState } from "react";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconUserPlus,
  IconUser,
} from "@tabler/icons-react";
import { Avatar, Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import classes from "./NavBar.module.scss";
import { useAppSelector } from "@/app/hooks";
import {
  useLazyGetMeQuery,
  useLogoutMeMutation,
} from "@/app/services/auth/authApi";
import { useNavigate } from "react-router-dom";

interface NavbarLinkProps {
  icon: typeof IconHome2;
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
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Домой" },
  { icon: IconUserPlus, label: "Пользователи", navigate: "/users" },
  // { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  // { icon: IconCalendarStats, label: "Releases" },
  // { icon: IconUser, label: "Account" },
  // { icon: IconFingerprint, label: "Security" },
  // { icon: IconSettings, label: "Settings" },
];

export function NavBar() {
  const [active, setActive] = useState(0);

  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
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
        <Stack justify="center" gap={0}>
          <NavbarLink icon={IconLogout} label="Выход" onClick={logoutSession} />
        </Stack>
      </span>
    </nav>
  );
}
