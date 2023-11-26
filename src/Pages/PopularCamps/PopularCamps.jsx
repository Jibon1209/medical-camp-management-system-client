import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import CampCards from "../../Components/CampCards";

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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {popularCards.map((popularCard) => (
          <CampCards
            key={popularCard._id}
            popularCard={popularCard}
          ></CampCards>
        ))}
      </div>
    </div>
  );
};

export default PopularCamps;
