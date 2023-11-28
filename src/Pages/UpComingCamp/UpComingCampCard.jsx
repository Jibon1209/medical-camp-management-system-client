import { Card } from "flowbite-react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UpComingCampCard = ({ upcomingCard }) => {
  const {
    _id,
    campName,
    location,
    fees,
    dateTime,
    image,
    services,
    audience,
    professionalCount,
    participantCount,
  } = upcomingCard;
  const imageAnimate = {
    offscreen: { x: -100, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      rotate: [0, 10, 0],
      transition: { type: "spring", bounce: 0.4, duration: 1 },
    },
  };

  const textAnimate = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.5 },
    },
  };
  return (
    <motion.div
      initial={"offscreen"}
      whileInView={"onscreen"}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ staggerChildren: 0.5 }}
    >
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={image}
      >
        <motion.h5
          variants={textAnimate}
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {campName}
        </motion.h5>
        <div className="font-normal text-gray-700 dark:text-gray-400 space-y-2">
          <div className="flex justify-between items-center">
            <p>professional Count: {professionalCount}</p>
            <p> Participant Count: {participantCount}</p>
          </div>
          <motion.p variants={textAnimate}>Fees: {fees}</motion.p>
          <motion.p variants={textAnimate}>
            Date and Time: {moment(`${dateTime}`).format("YYYY-MM-DD HH:mm:ss")}
          </motion.p>
          <motion.p variants={textAnimate}>Location: {location}</motion.p>

          <motion.p variants={textAnimate}>Audience: {audience}</motion.p>
          <motion.p variants={textAnimate}>Services: {services}</motion.p>
        </div>
        <motion.div
          variants={imageAnimate}
          className="flex justify-center items-center"
        >
          <Link to={`/upcoming-camp-details/${_id}`}>
            <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mr-2 mb-1">
              Details
            </button>
          </Link>
        </motion.div>
      </Card>
    </motion.div>
  );
};
UpComingCampCard.propTypes = {
  upcomingCard: PropTypes.object,
};
export default UpComingCampCard;
