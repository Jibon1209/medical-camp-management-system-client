import {
  FaCalendar,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaWallet,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import { TbBrandBooking } from "react-icons/tb";
import { AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const isAdmin = useAdmin();
  console.log(isAdmin);
  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-[#D1A054]">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaCalendar /> Add items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaWallet /> Manage items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/nanageBookings">
                  <FaShoppingCart /> Manage bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <VscFeedback /> All users
                </NavLink>
              </li>
            </>
          ) : (
            <>
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

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <AiOutlineMenu /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaShoppingBag /> Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <AiOutlineMail /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
