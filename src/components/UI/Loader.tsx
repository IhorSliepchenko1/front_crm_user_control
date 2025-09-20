import { Loader as UiLoader } from "@mantine/core";

const Loader = () => {
  return (
    <div className="flex justify-center h-[100vh] items-center">
      <UiLoader color="blue" size="lg" type="bars" />
    </div>
  );
};

export default Loader;
