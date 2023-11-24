import { Banner } from "flowbite-react";
import bannerimg from "../../assets/Banner.jpg";
import banner from "../../assets/bg4.jpg";

const Header = () => {
  return (
    <Banner className="xl:px-24 px-4">
      <div className="h-56 sm:h-64 xl:h-96 2xl:h-[550px]">
        <img
          className="w-full h-full object-cover rounded-md"
          src={banner}
          alt=""
        />
      </div>
    </Banner>
  );
};

export default Header;
