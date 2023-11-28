import SectionTitle from "../../Components/SectionTitle";
import { motion } from "framer-motion";
import bgimg from "../../assets/accord-img.png";
import { Accordion } from "flowbite-react";

const AccordionSection = () => {
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
      <SectionTitle heading="Explore CampHealth Portal" />
      <div className=" xl:px-2 mt-10">
        <motion.div
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
          className="py-24 flex flex-col lg:flex-row-reverse items-center justify-between gap-4 lg:gap-8"
        >
          {/* img */}
          <motion.div
            variants={imageAnimate}
            className="md:w-1/2 bg-[#3983fe] rounded-md"
          >
            <img className="w-full" src={bgimg} alt="" />
          </motion.div>

          {/* texts */}
          <motion.div variants={imageAnimate} className="md:w-1/2  space-y-7">
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title className="text-black font-semibold">
                  What We Offer
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-black ">
                    At CampHealth, we offer a wide array of health-related
                    initiatives, ranging from specialized medical camps to
                    wellness programs. Explore the diversity of our offerings
                    and find events tailored to your health needs and interests.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="text-black font-semibold">
                  Why Choose CampHealth{" "}
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-black">
                    <span className="font-medium">
                      Diverse Health Initiatives:
                    </span>{" "}
                    From heart health awareness camps to dental check-ups, we
                    provide a variety of health initiatives to cater to
                    different medical needs.
                  </p>
                  <p className="mb-2 text-black">
                    <span className="font-medium">
                      Community-Centric Approach:
                    </span>{" "}
                    Our platform fosters a sense of community by bringing
                    individuals together for shared health goals. Connect with
                    like-minded people and health professionals who care about
                    well-being
                  </p>
                  <p className=" text-black">
                    <span className="font-medium">
                      Professional Healthcare Providers:
                    </span>{" "}
                    CampHealth collaborates with experienced healthcare
                    professionals, ensuring that participants receive quality
                    care and guidance during our events.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title className="text-black font-semibold">
                  How It Works
                </Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-black">
                    <span className="font-medium">Explore Events:</span> Browse
                    upcoming medical camps and wellness programs tailored to
                    your needs.
                  </p>
                  <p className="mb-2 text-black">
                    <span className="font-medium">Register Easily:</span>{" "}
                    Participate in events by completing our simple and secure
                    registration process.
                  </p>
                  <p className="mb-2 text-black">
                    <span className="font-medium">
                      Connect with Professionals:
                    </span>{" "}
                    Interact with experienced healthcare professionals, ask
                    questions, and gain valuable insights to improve your
                    health.
                  </p>
                  <p className=" text-black">
                    <span className="font-medium">
                      Become a Health Advocate:
                    </span>{" "}
                    Share your experiences, inspire others, and contribute to a
                    healthier community.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccordionSection;
