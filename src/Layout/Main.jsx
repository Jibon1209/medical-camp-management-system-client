import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Main = () => {
  return (
    <div>
      <Outlet />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Main;
