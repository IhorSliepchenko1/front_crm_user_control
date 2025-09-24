import { Title } from "@mantine/core";
import PrevPage from "./PrevPage";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex gap-5">
      <PrevPage />
      <Title order={2}>{title}</Title>
    </div>
  );
};

export default PageTitle;
