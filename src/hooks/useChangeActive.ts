import { useState } from "react";

export const useChangeActive = () => {
  const [active, setActive] = useState(true);

  const changeActive = (args: boolean) => {
    setActive(args);
  };

  return { active, changeActive };
};
