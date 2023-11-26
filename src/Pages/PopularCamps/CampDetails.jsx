import moment from "moment";
import SectionTitle from "../../Components/SectionTitle";
import { useLoaderData } from "react-router-dom";

const CampDetails = () => {
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
    description,
  } = useLoaderData();
  return (
    <div className="xl:px-24 px-4 pt-20 mb-10">
      <SectionTitle heading="Camps Details"></SectionTitle>
      <div className="flex flex-col md:flex-row lg:justify-evenly items-center gap-6">
        <div className="flex justify-center items-center">
          <img className="rounded-md" src={image} alt="" />
        </div>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          <h5 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {campName}
          </h5>
          <p>Fees: {fees}</p>
          <p>
            Date and Time: {moment(`${dateTime}`).format("YYYY-MM-DD HH:mm:ss")}
          </p>
          <p>Location: {location}</p>
          <p>Professional: {professional}</p>
          <p>Audience: {audience}</p>
          <p>Services: {services}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CampDetails;
