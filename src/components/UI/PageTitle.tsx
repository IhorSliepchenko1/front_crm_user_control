import { Title } from "@mantine/core";
import PrevPage from "./PrevPage";

type Props = {
  title: string;
  cursive?: string;
};

const PageTitle: React.FC<Props> = ({ title, cursive }) => {
  return (
    <div className="flex gap-5">
      <PrevPage />
      <Title order={2}>
        {title}
        {cursive && <i>{cursive}</i>}
      </Title>
    </div>
  );
};

export default PageTitle;
