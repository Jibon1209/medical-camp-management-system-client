import { useState } from "react";
import UseAuth from "../../Hooks/UseAuth";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import profilpic from "../../assets/profile.png";
import { Avatar, Dropdown } from "flowbite-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = UseAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // menu toggle btn
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Home" },
    {
      path: user ? "/availableCamps" : "",
      title: user ? "Available Camps" : "",
    },
    { path: user ? "/dashboard" : "", title: user ? " Dashboard" : "" },
    { path: "/contactUs", title: "Contact Us" },
  ];
  const filteredNavItems = navItems.filter((item) => item.path !== "");

  return (
    <header className="fixed z-10 w-full xl:px-24 px-4 bg-Primary md:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <nav className="flex justify-between items-center py-4">
        <a href="/" className="flex items-center gap-2 text-xl">
          <span className="font-medium text-white">CampHealth Portal</span>
        </a>
        {/* nav items */}
        <ul className="hidden md:flex gap-4">
          {filteredNavItems.map(({ path, title }) => (
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
        {/* sign up signout btn */}
        <div className="text-lg font-medium space-x-5 hidden md:block">
          {user ? (
            <>
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-2 overflow-hidden">
                  {user?.photoURL ? (
                    <>
                      <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                          <Avatar
                            alt="User settings"
                            img={user?.photoURL}
                            rounded
                          />
                        }
                      >
                        <Dropdown.Header>
                          <span className="block text-sm">
                            {user?.displayName}
                          </span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                          <button onClick={handleLogout}>Sign out</button>
                        </Dropdown.Item>
                      </Dropdown>
                    </>
                  ) : (
                    <>
                      {" "}
                      <img
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src={profilpic}
                        alt=""
                      />
                    </>
                  )}
                </div>
                {/* <Button title="Log out" fanction={handleLogout} /> */}
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 text-white">
                <Link to="/signin">
                  <button className="hover:text-black">Sign In</button>
                </Link>
                <Link to="/signup">
                  <button className="hover:text-black">Sign Up</button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* mobile menu */}
        <div className="md:hidden block">
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
      </nav>
      {/* mobile menu items */}
      <div className={`px-4 py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
          {filteredNavItems.map(({ path, title }) => (
            <li key={path} className="text-lg text-white font-medium py-1">
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-Black" : ""
                  } group relative inline-block cursor-pointer hover:text-black`
                }
              >
                {title}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
              </NavLink>
            </li>
          ))}

          <li className="text-lg text-white font-medium py-1 group relative inline-block cursor-pointer hover:text-black">
            {user ? (
              <button onClick={handleLogout}>Log out</button>
            ) : (
              <Link to="/signin">
                Sign In{" "}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;
