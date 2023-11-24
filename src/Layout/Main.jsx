import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NavBar from "../Pages/Shared/NavBar";
import Footer from "../Pages/Shared/Footer";

const Main = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Main;
