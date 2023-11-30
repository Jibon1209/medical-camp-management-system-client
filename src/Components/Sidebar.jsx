import { Spinner } from "flowbite-react";
import useRole from "../Hooks/useRole";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { FaRegRegistered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [userRole, roleLoading] = useRole();
  if (roleLoading) {
    return <Spinner aria-label="Extra large spinner example" size="xl" />;
  }
  const dashboardLinks = {
    admin: [
      {
        path: "/dashboard/adminHome",
        icon: <FaHome size={20} />,
        title: "Organizer Home",
      },
      {
        path: "/dashboard/organizer-profile",
        icon: <CgProfile size={20} />,
        title: "Profile Management",
      },
      {
        path: "/dashboard/add-a-camp",
        icon: <IoIosAddCircleOutline size={20} />,
        title: "Add Camp",
      },
      {
        path: "/dashboard/manage-camps",
        icon: <MdManageAccounts size={20} />,
        title: "Manage Camps",
      },
      {
        path: "/dashboard/manage-registered-camps",
        icon: <FaRegRegistered size={20} />,
        title: " Registered Camps",
      },
      {
        path: "/dashboard/add-upcoming-camp",
        icon: <IoIosAddCircleOutline size={20} />,
        title: " Add Upcoming Camps",
      },
      {
        path: "/dashboard/manage-upcoming-camps",
        icon: <MdManageAccounts size={20} />,
        title: " Manage Upcoming Camps",
      },
    ],
    organizer: [
      {
        path: "/dashboard/organizer-profile",
        icon: <CgProfile size={20} />,
        title: "Profile Management",
      },
      {
        path: "/dashboard/add-a-camp",
        icon: <IoIosAddCircleOutline size={20} />,
        title: "Add Camp",
      },
      {
        path: "/dashboard/manage-camps",
        icon: <MdManageAccounts size={20} />,
        title: "Manage Camps",
      },
      {
        path: "/dashboard/manage-registered-camps",
        icon: <FaRegRegistered size={20} />,
        title: " Registered Camps",
      },
      {
        path: "/dashboard/add-upcoming-camp",
        icon: <IoIosAddCircleOutline size={20} />,
        title: " Add Upcoming Camps",
      },
      {
        path: "/dashboard/manage-upcoming-camps",
        icon: <MdManageAccounts size={20} />,
        title: " Manage Upcoming Camps",
      },
    ],
    professional: [
      {
        path: "/dashboard/professional-profile",
        icon: <FaHome size={20} />,
        title: "Profile",
      },
      {
        path: "/dashboard/accepted-camps",
        icon: <IoIosAddCircleOutline size={20} />,
        title: "AcceptedCamps",
      },
    ],
    participant: [
      {
        path: "/dashboard/participant-profile",
        icon: <FaHome size={20} />,
        title: "Profile",
      },
      {
        path: "/dashboard/registered-camps",
        icon: <MdManageAccounts size={20} />,
        title: "Registered Camps",
      },
      {
        path: "/dashboard/payment-history",
        icon: <FaRegRegistered size={20} />,
        title: "Payment History",
      },
      {
        path: "/dashboard/feedback-and-ratings",
        icon: <IoIosAddCircleOutline size={20} />,
        title: "Feedback and Ratings",
      },
    ],
  };
  const renderLinks = () => {
    const links = dashboardLinks[userRole] || [];
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
  const navItems = [
    { path: "/", title: "Home" },
    {
      path: "/availableCamps",
      title: "Available Camps",
    },
    { path: "/dashboard", title: " Dashboard" },
    { path: "/contactUs", title: "Contact Us" },
  ];
  return (
    <div className="bg-Primary w-80 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <span className="text-white text-xl font-medium">
          CampHealth Portal
        </span>
      </div>
      <div className="py-8 flex flex-1 flex-col gap-0.5">
        <ul className="flex  flex-col space-y-2 p-4">{renderLinks()}</ul>
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700 mb-5">
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-lg text-white font-medium">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-black" : ""
                  } group relative inline-block cursor-pointer hover:text-black`
                }
              >
                {title}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
