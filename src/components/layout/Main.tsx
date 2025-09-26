import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

const Main = () => {
  return (
    <main className="flex justify-between">
      <NavBar />
      <div className="w-[90vw] p-3 mx-auto">
        {/* <div className="grid justify-between"> */}
        {/* <div className="min-h-[95vh] flex justify-center">
            <Outlet />
          </div>
          <Footer /> */}
        {/* </div> */}
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
