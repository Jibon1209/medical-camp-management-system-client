import { NavLink } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";

const Footer = () => {
  const { user } = UseAuth();
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
    <footer>
      <div className=" bg-Primary text-white  mt-8 md:mt-0 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="flex flex-col md:flex-row justify-between p-8 xl:px-24 px-4">
          <div className=" w-full md:w-1/4">
            <h1 className=" font-semibold text-xl pb-4">CampHealth Portal</h1>
            <p className=" text-sm">
              A wellness hub for diverse medical camps, offering specialized
              services to elevate your well-being. Explore, engage, thrive,
              repeat!
            </p>
          </div>
          <div>
            <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
            <nav className=" flex flex-col gap-2">
              <ul>
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
            </nav>
          </div>
          <div>
            <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Legal</h1>
            <nav className=" flex flex-col gap-2">
              <a
                className=" hover:text-black transition-all cursor-pointer"
                href="/"
              >
                Privacy Policy
              </a>
              <a
                className=" hover:text-black transition-all cursor-pointer"
                href="/"
              >
                Licensing
              </a>
              <a
                className=" hover:text-black transition-all cursor-pointer"
                href="/"
              >
                Terms &amp; Conditions
              </a>
            </nav>
          </div>
          <div>
            <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">
              Contact Us
            </h1>
            <nav className=" flex flex-col gap-2">
              <a
                className=" hover:text-black transition-all cursor-pointer"
                href="/"
              >
                jessore007@email.com
              </a>
              <a
                className=" hover:text-black transition-all cursor-pointer"
                href="/"
              >
                +8801749018948
              </a>
            </nav>
          </div>
        </div>
        <div>
          <p>
            <p className=" text-center py-4">
              @copyright developed by
              <span className=" text-backgroundColor"> CampHealth Portal </span>
              | All rights reserved
            </p>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
