import { Card } from "flowbite-react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CampCards = ({ popularCard }) => {
  const {
    _id,
    campName,
    location,
    professional,
    fees,
    dateTime,
    image,
    services,
    audience,
    participantCount,
  } = popularCard;
  return (
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={image}
    >
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {campName}
      </h5>
      <div className="font-normal text-gray-700 dark:text-gray-400 space-y-2">
        <div className="flex justify-between items-center">
          <p>Fees: {fees}</p>
          <p> Participant Count: {participantCount}</p>
        </div>
        <p>
          Date and Time: {moment(`${dateTime}`).format("YYYY-MM-DD HH:mm:ss")}
        </p>
        <p>Location: {location}</p>
        <p>Professional: {professional}</p>
        <p>Audience: {audience}</p>
        <p>Services: {services}</p>
      </div>
      <div className="flex justify-center items-center">
        <Link to={`/camp-details/${_id}`}>
          <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mr-2 mb-1">
            Details
          </button>
        </Link>
      </div>
    </Card>
  );
};
CampCards.propTypes = {
  popularCard: PropTypes.object,
};
export default CampCards;
