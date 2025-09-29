import { Table } from "@mantine/core";

const TaskHeader = () => {
  const headerItem = [
    "название",
    "создан",
    "статус",
    "исполнители",
    "срок сдачи",
  ];

  return (
    <Table.Thead className="text-[12px]">
      <Table.Tr>
        {headerItem.map((item) => (
          <Table.Th key={item}>{item}</Table.Th>
        ))}
      </Table.Tr>
    </Table.Thead>
  );
};

export default TaskHeader;
