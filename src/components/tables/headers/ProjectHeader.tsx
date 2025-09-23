import { Table } from "@mantine/core";

const ProjectHeader = () => {

  return (
    <Table.Thead className="text-[12px]">
      <Table.Tr>
        <Table.Th>название</Table.Th>
        <Table.Th>создан</Table.Th>
        <Table.Th>создатель</Table.Th>
        <Table.Th>к-во участников</Table.Th>
        <Table.Th>к-во задач</Table.Th>
        <Table.Th>задачи в процессе</Table.Th>
        <Table.Th>задачи на проверке</Table.Th>
        <Table.Th>выполненные задачи</Table.Th>
        <Table.Th>отменённые задачи</Table.Th>
        <Table.Th>смена статуса</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default ProjectHeader;
