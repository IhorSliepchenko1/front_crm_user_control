const TableScrolContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full overflow-x-auto">{children}</div>;
};

export default TableScrolContainer;
