import AboutUs from "../About Us/AboutUs";
import AccordionSection from "../Accordion/AccordionSection";
import Header from "../Header/Header";
import PopularCamps from "../PopularCamps/PopularCamps";
import Testimonials from "../Testimonials/Testimonials";
import UpComingCamp from "../UpComingCamp/UpComingCamp";

const Home = () => {
  return (
    <div className="pt-20">
      <Header />
      <PopularCamps />
      <AboutUs />
      <UpComingCamp />
      <Testimonials />
      <AccordionSection />
    </div>
  );
};

export default Home;
