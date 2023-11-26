import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { useState } from "react";
import { FaBarsStaggered, FaRegRegistered, FaXmark } from "react-icons/fa6";
import useRole from "../Hooks/useRole";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import NavBar from "../Pages/Shared/NavBar";
import UseAuth from "../Hooks/UseAuth";

const Dashboard = () => {
  const role = useRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const dashboardLinks = {
    admin: [
      {
        path: "/dashboard/adminHome",
        icon: <FaHome size={20} />,
        title: isMenuOpen ? "Organizer Home" : "",
      },
      {
        path: "/dashboard/organizer-profile",
        icon: <CgProfile size={20} />,
        title: isMenuOpen ? "Profile Management" : "",
      },
      {
        path: "/dashboard/add-a-camp",
        icon: <IoIosAddCircleOutline size={20} />,
        title: isMenuOpen ? "Add Camp" : "",
      },
      {
        path: "/dashboard/manage-camps",
        icon: <MdManageAccounts size={20} />,
        title: isMenuOpen ? "Manage Camps" : "",
      },
      {
        path: "/dashboard/manage-registered-camps",
        icon: <FaRegRegistered size={20} />,
        title: isMenuOpen ? " Registered Camps" : "",
      },
      {
        path: "/dashboard/add-upcoming-camp",
        icon: <IoIosAddCircleOutline size={20} />,
        title: isMenuOpen ? " Add Upcoming Camps" : "",
      },
      {
        path: "/dashboard/manage-upcoming-camps",
        icon: <MdManageAccounts size={20} />,
        title: isMenuOpen ? " Manage Upcoming Camps" : "",
      },
    ],
    organizer: [
      {
        path: "/dashboard/organizer-profile",
        icon: <CgProfile size={20} />,
        title: isMenuOpen ? "Profile Management" : "",
      },
      {
        path: "/dashboard/add-a-camp",
        icon: <IoIosAddCircleOutline size={20} />,
        title: isMenuOpen ? "Add Camp" : "",
      },
      {
        path: "/dashboard/manage-camps",
        icon: <MdManageAccounts size={20} />,
        title: isMenuOpen ? "Manage Camps" : "",
      },
      {
        path: "/dashboard/manage-registered-camps",
        icon: <FaRegRegistered size={20} />,
        title: isMenuOpen ? " Registered Camps" : "",
      },
      {
        path: "/dashboard/add-upcoming-camp",
        icon: <IoIosAddCircleOutline size={20} />,
        title: isMenuOpen ? " Add Upcoming Camps" : "",
      },
      {
        path: "/dashboard/manage-upcoming-camps",
        icon: <MdManageAccounts size={20} />,
        title: isMenuOpen ? " Manage Upcoming Camps" : "",
      },
    ],
    professional: [
      {
        path: "/dashboard/professional-profile",
        icon: <FaHome size={20} />,
        title: isMenuOpen ? "Profile" : "",
      },
    ],
    participant: [
      {
        path: "/dashboard/participant-profile",
        icon: <FaHome size={20} />,
        title: isMenuOpen ? "Profile" : "",
      },
    ],
  };
  const renderLinks = () => {
    console.log("Rendering Links for Role:", role);
    const links = dashboardLinks[role[0]] || [];
    console.log("Links:", links);
    return links.map(({ path, icon, title }) => (
      <li key={path} className="text-lg text-white font-medium">
        <NavLink
          to={path}
          className={({ isActive }) =>
            `${
              isActive ? "text-black" : ""
            } group relative inline-block cursor-pointer hover:text-black`
          }
        >
          <div className="flex justify-center items-center gap-2">
            {icon}
            {title}
          </div>
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
        </NavLink>
      </li>
    ));
  };
  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="md:flex  mt-[60.4px] md:mt-[70px]">
          <div
            className={`${
              isMenuOpen ? "w-[290px]" : ""
            }  min-h-screen bg-Primary`}
          >
            <ul className="flex  flex-col space-y-2 p-4">
              <div>
                <button onClick={handleMenuToggler}>
                  {isMenuOpen ? (
                    <>
                      <FaXmark className="w-5 h-5 text-white" />
                    </>
                  ) : (
                    <>
                      <FaBarsStaggered className="w-5 h-5 text-white" />
                    </>
                  )}
                </button>
              </div>
              {renderLinks()}
            </ul>
          </div>
        </div>
        <div className={` w-full mt-20`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
