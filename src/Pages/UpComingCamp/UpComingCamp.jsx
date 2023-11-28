import SectionTitle from "../../Components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import UpComingCampCard from "./UpComingCampCard";

const UpComingCamp = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: upcommingcamps = [] } = useQuery({
    queryKey: ["upcommingcamps"],
    queryFn: async () => {
      const response = await axiosPublic.get("/upcommingcamps");
      return response.data.data;
    },
  });
  return (
    <div className=" xl:px-24 px-4">
      <div className="my-20">
        <SectionTitle heading="Upcoming Camp"></SectionTitle>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {upcommingcamps.slice(0, 8).map((upcomingCard) => (
          <UpComingCampCard
            key={upcomingCard._id}
            upcomingCard={upcomingCard}
          />
        ))}
      </div>
    </div>
  );
};

export default UpComingCamp;
