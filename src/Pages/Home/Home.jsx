import AboutUs from "../About Us/AboutUs";
import Header from "../Header/Header";
import PopularCamps from "../PopularCamps/PopularCamps";

const Home = () => {
  return (
    <div className="pt-20">
      <Header />
      <PopularCamps />
      <AboutUs />
    </div>
  );
};

export default Home;
