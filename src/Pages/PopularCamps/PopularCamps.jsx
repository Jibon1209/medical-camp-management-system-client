import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import CampCards from "../../Components/CampCards";
import { Link } from "react-router-dom";

const PopularCamps = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: popularCards = [] } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const response = await axiosPublic.get("/popular/camps");
      return response.data.data;
    },
  });
  return (
    <div className="xl:px-24 px-4 pt-10">
      <SectionTitle heading="Popular Medical Camps"></SectionTitle>
      <div className="my-10 flex justify-center">
        <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mr-2 mb-1">
          Sort by participant engagement
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularCards.map((popularCard) => (
          <CampCards
            key={popularCard._id}
            popularCard={popularCard}
          ></CampCards>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link>
          <button className="py-2 px-2 bg-Primary hover:scale-110 text-white rounded-md mr-2 mb-1">
            See All Camps
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
