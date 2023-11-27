import Sidebar from "../Components/Sidebar";
import DashHeader from "../Components/DashHeader";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="bg-Primary h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-Background">
        <DashHeader />
        <div className="flex-1 p-4 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
