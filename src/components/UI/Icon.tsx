import type { IconType } from "react-icons/lib";
type Props = {
  icon: IconType;
  size?: number;
  color?: string;
};

const Icon: React.FC<Props> = ({ icon: Icon, size = 50, color }) => {
  return <Icon size={size} color={color} />;
};

export default Icon;
