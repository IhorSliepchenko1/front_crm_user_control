export type Register = {
  login: string;
  password: string;
  adminCode?: string;
};

export type Login = {
  login: string;
  password: string;
  remember: boolean;
};

export type UserRoles = ("USER" | "ADMIN")[];
