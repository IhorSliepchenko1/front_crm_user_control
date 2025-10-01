import { Table } from "@mantine/core";

const ProjectHeader = () => {
  const headerItem = [
    "название",
    "создан",
    "создатель",
    "к-во участников",
    "к-во задач",
    "задачи в процессе",
    "задачи на проверке",
    "выполненные задачи",
    "отменённые задачи",
    "смена статуса",
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

export default ProjectHeader;
