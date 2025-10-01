import { Table } from "@mantine/core";

const UserHeader = ({ isAdmin }: { isAdmin: boolean }) => {
  const headerItem = [
    "имя",
    "аватар",
    "создан",
    "проекты",
    "участник проектов",
    "к-во задач",
    "задачи в процессе",
    "задачи на проверке",
    "выполнено задач",
    "отменённые задачи",
    "роль",
  ];
  return (
    <Table.Thead className="text-[12px] sticky top-0">
      <Table.Tr>
        {headerItem.map((item) => (
          <Table.Th key={item}>{item}</Table.Th>
        ))}
        {isAdmin && <Table.Th>смена статуса</Table.Th>}
        {isAdmin && <Table.Th>вылогинить</Table.Th>}
      </Table.Tr>
    </Table.Thead>
  );
};

export default UserHeader;
