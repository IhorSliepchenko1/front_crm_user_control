type Props = {
  projectInfo: { title: string; value: string | number }[];
};

const ProjectData: React.FC<Props> = ({ projectInfo }) => {
  return (
    <div>
      <div className="grid gap-3">
        {projectInfo.map((item, index) => (
          <div key={index} className="w-[300px] flex justify-between">
            <span>{item.title}:</span>
            <strong className={item.title === "Куратор" ? "border-b-1" : ""}>
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectData;
