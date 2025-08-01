import { Outlet, Link } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <h1>navbar</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register/host">Register Host</Link>
          </li>
        </ul>
      </nav>

      <div className="container-xl">
        <Outlet />
      </div>

      <h2>footer</h2>
    </div>
  );
};

export default MainLayout;
