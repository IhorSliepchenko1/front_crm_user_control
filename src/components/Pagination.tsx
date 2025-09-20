import { Group, Pagination as PaginationUI } from "@mantine/core";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
};

const Pagination: React.FC<Props> = ({ total, setPage }) => {
  return (
    <PaginationUI.Root
      total={total}
      defaultValue={1}
      onChange={setPage}
      className="mt-2"
    >
      <Group gap={5} justify="center">
        <PaginationUI.First />
        <PaginationUI.Previous />
        <PaginationUI.Items />
        <PaginationUI.Next />
        <PaginationUI.Last />
      </Group>
    </PaginationUI.Root>
  );
};

export default Pagination;
