import { Banner } from "flowbite-react";
import banner from "../../assets/bg4.jpg";

const Header = () => {
  return (
    <Banner className="xl:px-24 px-4 ">
      <div className="relative z-0 h-56 sm:h-64 xl:h-96 2xl:h-[550px]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={banner}
          alt=""
        />
        <div className="absolute rounded-xl flex items-center h-full  left-0 top-0  bg-gradient-to-r from-[#151515] to-[rgba(21,21,21,0)]">
          <div className=" space-y-4 pl-12 ">
            <h1 className="uppercase text-xl lg:text-4xl font-bold text-white">
              Cultivate Well-being, Foster Community
            </h1>
            <p className=" text-white">
              Elevate Your Camp Experience with CampHealth Portal.
            </p>
          </div>
        </div>
      </div>
    </Banner>
  );
};

export default Header;
