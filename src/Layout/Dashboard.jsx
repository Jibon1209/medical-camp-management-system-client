import { FaCalendar, FaHome, FaShoppingCart, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import { TbBrandBooking } from "react-icons/tb";
import useAdmin from "../Hooks/useAdmin";
import { useState } from "react";
import { FaBarsStaggered, FaRegRegistered, FaXmark } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";

const Dashboard = () => {
  const isAdmin = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isAdmin);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const dashboardlinks = [
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
      title: isMenuOpen ? "Add A Camp" : "",
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
  ];
  return (
    <div className="flex fixed md:z-10 pt-[60.4px] md:pt-[72.4px]">
      <div
        className={`${
          isMenuOpen ? "w-full" : "w-full"
        }  min-h-screen bg-Primary`}
      >
        <ul className="flex flex-col space-y-2 p-4">
          {isAdmin ? (
            <>
              <div className="">
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
              {dashboardlinks.map(({ path, icon, title }) => (
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
              ))}
            </>
          ) : (
            <>
              <div className="">
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
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendar /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaWallet /> payment history
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart /> My Cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addReview">
                  <VscFeedback /> Add review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBooking">
                  <TbBrandBooking /> My booking
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
