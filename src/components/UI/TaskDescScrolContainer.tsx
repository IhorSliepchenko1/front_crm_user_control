const TaskDescScrolContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-2 p-8 bg-[#555555] max-h-[500px] overflow-y-auto border-2">
      {children}
    </div>
  );
};

export default TaskDescScrolContainer;
