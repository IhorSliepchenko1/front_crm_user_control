import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

const Main = () => {
  return (
    <main className="flex justify-between">
      <NavBar />
      <div className="w-[90vw] p-3 mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
