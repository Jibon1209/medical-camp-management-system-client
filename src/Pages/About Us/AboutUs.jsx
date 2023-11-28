import aboutimg from "../../assets/about-img.png";
import SectionTitle from "../../Components/SectionTitle";
import { motion } from "framer-motion";

const AboutUs = () => {
  const imageAnimate = {
    offscreen: { x: -100, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      rotate: [0, 10, 0],
      transition: { type: "spring", bounce: 0.4, duration: 1 },
    },
  };
  return (
    <div className="pt-10 xl:px-24 px-4">
      <SectionTitle heading="About Us" />
      <div className=" xl:px-2 mt-10">
        <motion.div
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
          className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-4 lg:gap-8"
        >
          {/* img */}
          <motion.div
            variants={imageAnimate}
            className="md:w-1/2 bg-[#3983fe] rounded-md"
          >
            <img className="w-full" src={aboutimg} alt="" />
          </motion.div>

          {/* texts */}
          <motion.div variants={imageAnimate} className="md:w-1/2  space-y-7">
            <h2 className="lg:text-5xl text-4xl  font-bold md:leading-snug leading-snug">
              Our Vision
            </h2>
            <p className=" mdtext-xl">
              We envision a world where healthcare is accessible, inclusive, and
              proactive. Through CampHealth Portal, we strive to create a
              network that empowers individuals to take charge of their
              well-being and connects them with the right resources for a
              healthier life.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
