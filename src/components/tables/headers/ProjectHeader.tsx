import { Table } from "@mantine/core";

type Props = {
  isShowBtnTitle?: boolean;
};

const ProjectHeader: React.FC<Props> = ({ isShowBtnTitle = false }) => {
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

  if (!isShowBtnTitle) {
    headerItem.pop();
  }
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
