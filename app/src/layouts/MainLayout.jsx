import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <h1>navbar</h1>

      <div className="container-xl">
        <Outlet />
      </div>

      <h2>footer</h2>
    </div>
  );
};

export default MainLayout;
