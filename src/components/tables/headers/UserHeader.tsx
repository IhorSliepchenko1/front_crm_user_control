import { Table } from "@mantine/core";

const UserHeader = () => {
  return (
    <Table.Thead className="text-[12px]">
      <Table.Tr>
        <Table.Th>имя</Table.Th>
        <Table.Th>создан</Table.Th>
        <Table.Th>проекты</Table.Th>
        <Table.Th>участник проектов</Table.Th>
        <Table.Th>к-во задач</Table.Th>
        <Table.Th>выполнено задач</Table.Th>
        <Table.Th>задачи на проверке</Table.Th>
        <Table.Th>задачи в работе</Table.Th>
        <Table.Th>отменёные задачи</Table.Th>
        <Table.Th>роль</Table.Th>
        <Table.Th>смена статуса</Table.Th>
      </Table.Tr>
    </Table.Thead>
  );
};

export default UserHeader;
