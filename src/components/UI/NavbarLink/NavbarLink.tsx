import type { LucideProps } from "lucide-react";
import { Tooltip, UnstyledButton } from "@mantine/core";
import type React from "react";
import classes from "./NavbarLink.module.scss";

type Props = {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  active?: boolean;
  onClick?: () => void;
  navigate?: string;
};

const NavbarLink: React.FC<Props> = ({
  icon: Icon,
  label,
  active,
  onClick,
}) => {
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
};

export default NavbarLink;
